package com.music.infrastructure.repository

import com.music.domain.model.Artist
import com.music.domain.repository.ArtistRepository
import com.music.infrastructure.database.Artists
import com.music.infrastructure.database.DatabaseFactory.dbQuery
import org.jetbrains.exposed.sql.ResultRow
import org.jetbrains.exposed.sql.SqlExpressionBuilder.eq
import org.jetbrains.exposed.sql.andWhere
import org.jetbrains.exposed.sql.deleteWhere
import org.jetbrains.exposed.sql.insert
import org.jetbrains.exposed.sql.select
import org.jetbrains.exposed.sql.selectAll
import org.jetbrains.exposed.sql.update

class ArtistRepositoryImpl : ArtistRepository {
    private fun resultRowToArtist(row: ResultRow) = Artist(
        id = row[Artists.id],
        name = row[Artists.name],
        country = row[Artists.country],
        activeYears = row[Artists.activeYears]
    )

    override suspend fun create(artist: Artist): Artist = dbQuery {
        val id = Artists.insert {
            it[name] = artist.name
            it[country] = artist.country
            it[activeYears] = artist.activeYears
        } get Artists.id
        artist.copy(id = id)
    }

    override suspend fun getById(id: Long): Artist? = dbQuery {
        Artists.select { Artists.id eq id }
            .map { resultRowToArtist(it) }
            .singleOrNull()
    }

    override suspend fun getAll(): List<Artist> = dbQuery {
        Artists.selectAll().map { resultRowToArtist(it) }
    }

    override suspend fun update(artist: Artist): Boolean = dbQuery {
        Artists.update({ Artists.id eq artist.id }) {
            it[name] = artist.name
            it[country] = artist.country
            it[activeYears] = artist.activeYears
        } > 0
    }

    override suspend fun delete(id: Long): Boolean = dbQuery {
        Artists.deleteWhere { Artists.id eq id } > 0
    }
}

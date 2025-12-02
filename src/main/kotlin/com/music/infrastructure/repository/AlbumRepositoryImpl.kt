package com.music.infrastructure.repository

import com.music.domain.model.Album
import com.music.domain.repository.AlbumRepository
import com.music.infrastructure.database.Albums
import com.music.infrastructure.database.DatabaseFactory.dbQuery
import org.jetbrains.exposed.sql.ResultRow
import org.jetbrains.exposed.sql.SqlExpressionBuilder.eq
import org.jetbrains.exposed.sql.insert
import org.jetbrains.exposed.sql.select
import org.jetbrains.exposed.sql.selectAll
import org.jetbrains.exposed.sql.deleteWhere
import org.jetbrains.exposed.sql.update

class AlbumRepositoryImpl : AlbumRepository {
    private fun resultRowToAlbum(row: ResultRow) = Album(
        id = row[Albums.id],
        title = row[Albums.title],
        artistId = row[Albums.artistId],
        releaseYear = row[Albums.releaseYear],
        genre = row[Albums.genre]
    )

    override suspend fun create(album: Album): Album = dbQuery {
        val id = Albums.insert {
            it[title] = album.title
            it[artistId] = album.artistId
            it[releaseYear] = album.releaseYear
            it[genre] = album.genre
        } get Albums.id
        album.copy(id = id)
    }

    override suspend fun getById(id: Long): Album? = dbQuery {
        Albums.select { Albums.id eq id }
            .map { resultRowToAlbum(it) }
            .singleOrNull()
    }

    override suspend fun getAll(): List<Album> = dbQuery {
        Albums.selectAll().map { resultRowToAlbum(it) }
    }

    override suspend fun getByArtist(artistId: Long): List<Album> = dbQuery {
        Albums.select { Albums.artistId eq artistId }
            .map { resultRowToAlbum(it) }
    }

    override suspend fun update(album: Album): Boolean = dbQuery {
        Albums.update({ Albums.id eq album.id }) {
            it[title] = album.title
            it[artistId] = album.artistId
            it[releaseYear] = album.releaseYear
            it[genre] = album.genre
        } > 0
    }

    override suspend fun delete(id: Long): Boolean = dbQuery {
        Albums.deleteWhere { Albums.id eq id } > 0
    }
}

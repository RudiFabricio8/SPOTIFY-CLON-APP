package com.music.infrastructure.repository

import com.music.domain.model.Song
import com.music.domain.repository.SongRepository
import com.music.infrastructure.database.Songs
import com.music.infrastructure.database.DatabaseFactory.dbQuery
import org.jetbrains.exposed.sql.ResultRow
import org.jetbrains.exposed.sql.SqlExpressionBuilder.eq
import org.jetbrains.exposed.sql.andWhere
import org.jetbrains.exposed.sql.deleteWhere
import org.jetbrains.exposed.sql.insert
import org.jetbrains.exposed.sql.select
import org.jetbrains.exposed.sql.selectAll
import org.jetbrains.exposed.sql.update

class SongRepositoryImpl : SongRepository {
    private fun resultRowToSong(row: ResultRow) = Song(
        id = row[Songs.id],
        title = row[Songs.title],
        albumId = row[Songs.albumId],
        duration = row[Songs.duration],
        trackNumber = row[Songs.trackNumber]
    )

    override suspend fun create(song: Song): Song = dbQuery {
        val id = Songs.insert {
            it[title] = song.title
            it[albumId] = song.albumId
            it[duration] = song.duration
            it[trackNumber] = song.trackNumber
        } get Songs.id
        song.copy(id = id)
    }

    override suspend fun getById(id: Long): Song? = dbQuery {
        Songs.select { Songs.id eq id }
            .map { resultRowToSong(it) }
            .singleOrNull()
    }

    override suspend fun getByAlbum(albumId: Long): List<Song> = dbQuery {
        Songs.select { Songs.albumId eq albumId }
            .map { resultRowToSong(it) }
    }

    override suspend fun update(song: Song): Boolean = dbQuery {
        Songs.update({ Songs.id eq song.id }) {
            it[title] = song.title
            it[albumId] = song.albumId
            it[duration] = song.duration
            it[trackNumber] = song.trackNumber
        } > 0
    }

    override suspend fun delete(id: Long): Boolean = dbQuery {
        Songs.deleteWhere { Songs.id eq id } > 0
    }
}

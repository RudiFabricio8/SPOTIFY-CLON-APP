package com.music.domain.repository

import com.music.domain.model.Song

interface SongRepository {
    suspend fun create(song: Song): Song
    suspend fun getById(id: Long): Song?
    suspend fun getByAlbum(albumId: Long): List<Song>
    suspend fun update(song: Song): Boolean
    suspend fun delete(id: Long): Boolean
}

package com.music.domain.repository

import com.music.domain.model.Album

interface AlbumRepository {
    suspend fun create(album: Album): Album
    suspend fun getById(id: Long): Album?
    suspend fun getAll(): List<Album>
    suspend fun getByArtist(artistId: Long): List<Album>
    suspend fun update(album: Album): Boolean
    suspend fun delete(id: Long): Boolean
}

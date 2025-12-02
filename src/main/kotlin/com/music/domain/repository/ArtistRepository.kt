package com.music.domain.repository

import com.music.domain.model.Artist

interface ArtistRepository {
    suspend fun create(artist: Artist): Artist
    suspend fun getById(id: Long): Artist?
    suspend fun getAll(): List<Artist>
    suspend fun update(artist: Artist): Boolean
    suspend fun delete(id: Long): Boolean
}

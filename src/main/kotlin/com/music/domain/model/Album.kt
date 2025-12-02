package com.music.domain.model

data class Album(
    val id: Long = 0,
    val title: String,
    val artistId: Long,
    val releaseYear: Int,
    val genre: String
)

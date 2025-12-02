package com.music.domain.model

data class Song(
    val id: Long = 0,
    val title: String,
    val albumId: Long,
    val duration: Int, // in seconds
    val trackNumber: Int
)

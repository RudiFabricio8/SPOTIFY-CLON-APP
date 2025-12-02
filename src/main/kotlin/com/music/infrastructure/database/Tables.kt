package com.music.infrastructure.database

import org.jetbrains.exposed.sql.Table

object Artists : Table() {
    val id = long("id").autoIncrement()
    val name = varchar("name", 255)
    val country = varchar("country", 100)
    val activeYears = varchar("active_years", 100)
    
    override val primaryKey = PrimaryKey(id)
}

object Albums : Table() {
    val id = long("id").autoIncrement()
    val title = varchar("title", 255)
    val artistId = long("artist_id").references(Artists.id)
    val releaseYear = integer("release_year")
    val genre = varchar("genre", 100)
    
    override val primaryKey = PrimaryKey(id)
}

object Songs : Table() {
    val id = long("id").autoIncrement()
    val title = varchar("title", 255)
    val albumId = long("album_id").references(Albums.id)
    val duration = integer("duration") // in seconds
    val trackNumber = integer("track_number")
    
    override val primaryKey = PrimaryKey(id)
}

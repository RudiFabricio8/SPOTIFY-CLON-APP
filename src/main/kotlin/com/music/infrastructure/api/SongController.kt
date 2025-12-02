package com.music.infrastructure.api

import com.music.application.usecases.song.*
import com.music.domain.model.Song
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*

class SongController(
    private val createSongUseCase: CreateSongUseCase,
    private val getSongUseCase: GetSongUseCase,
    private val getSongsByAlbumUseCase: GetSongsByAlbumUseCase,
    private val updateSongUseCase: UpdateSongUseCase,
    private val deleteSongUseCase: DeleteSongUseCase
) {
    fun Route.songRoutes() {
        route("/songs") {
            // Create song
            post {
                val song = call.receive<Song>()
                val createdSong = createSongUseCase(song)
                call.respond(HttpStatusCode.Created, createdSong)
            }

            // Get song by ID
            get("/{id}") {
                val id = call.parameters["id"]?.toLongOrNull()
                    ?: throw BadRequestException("Invalid ID format")
                
                val song = getSongUseCase(id) ?: throw ResourceNotFoundException("Song not found")
                call.respond(song)
            }

            // Get songs by album
            get("/album/{albumId}") {
                val albumId = call.parameters["albumId"]?.toLongOrNull()
                    ?: throw BadRequestException("Invalid album ID format")
                
                val songs = getSongsByAlbumUseCase(albumId)
                call.respond(songs)
            }

            // Update song
            put("/{id}") {
                val id = call.parameters["id"]?.toLongOrNull()
                    ?: throw BadRequestException("Invalid ID format")
                
                val song = call.receive<Song>().copy(id = id)
                val updated = updateSongUseCase(song)
                
                if (updated) {
                    call.respond(HttpStatusCode.OK, song)
                } else {
                    throw ResourceNotFoundException("Song not found")
                }
            }

            // Delete song
            delete("/{id}") {
                val id = call.parameters["id"]?.toLongOrNull()
                    ?: throw BadRequestException("Invalid ID format")
                
                val deleted = deleteSongUseCase(id)
                
                if (deleted) {
                    call.respond(HttpStatusCode.NoContent)
                } else {
                    throw ResourceNotFoundException("Song not found")
                }
            }
        }
    }
}

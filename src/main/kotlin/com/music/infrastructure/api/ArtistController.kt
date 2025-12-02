package com.music.infrastructure.api

import com.music.application.usecases.artist.*
import com.music.domain.model.Artist
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*

class ArtistController(
    private val createArtistUseCase: CreateArtistUseCase,
    private val getArtistUseCase: GetArtistUseCase,
    private val getArtistsUseCase: GetArtistsUseCase,
    private val updateArtistUseCase: UpdateArtistUseCase,
    private val deleteArtistUseCase: DeleteArtistUseCase
) {
    fun Route.artistRoutes() {
        route("/artists") {
            // Create artist
            post {
                val artist = call.receive<Artist>()
                val createdArtist = createArtistUseCase(artist)
                call.respond(HttpStatusCode.Created, createdArtist)
            }

            // Get all artists
            get {
                val artists = getArtistsUseCase()
                call.respond(artists)
            }

            // Get artist by ID
            get("/{id}") {
                val id = call.parameters["id"]?.toLongOrNull()
                    ?: throw BadRequestException("Invalid ID format")
                
                val artist = getArtistUseCase(id) ?: throw ResourceNotFoundException("Artist not found")
                call.respond(artist)
            }

            // Update artist
            put("/{id}") {
                val id = call.parameters["id"]?.toLongOrNull()
                    ?: throw BadRequestException("Invalid ID format")
                
                val artist = call.receive<Artist>().copy(id = id)
                val updated = updateArtistUseCase(artist)
                
                if (updated) {
                    call.respond(HttpStatusCode.OK, artist)
                } else {
                    throw ResourceNotFoundException("Artist not found")
                }
            }

            // Delete artist
            delete("/{id}") {
                val id = call.parameters["id"]?.toLongOrNull()
                    ?: throw BadRequestException("Invalid ID format")
                
                val deleted = deleteArtistUseCase(id)
                
                if (deleted) {
                    call.respond(HttpStatusCode.NoContent)
                } else {
                    throw ResourceNotFoundException("Artist not found")
                }
            }
        }
    }
}

package com.music.infrastructure.api

import com.music.application.usecases.album.*
import com.music.domain.model.Album
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*

class AlbumController(
    private val createAlbumUseCase: CreateAlbumUseCase,
    private val getAlbumUseCase: GetAlbumUseCase,
    private val getAlbumsUseCase: GetAlbumsUseCase,
    private val getAlbumsByArtistUseCase: GetAlbumsByArtistUseCase,
    private val updateAlbumUseCase: UpdateAlbumUseCase,
    private val deleteAlbumUseCase: DeleteAlbumUseCase
) {
    fun Route.albumRoutes() {
        route("/albums") {
            // Create album
            post {
                val album = call.receive<Album>()
                val createdAlbum = createAlbumUseCase(album)
                call.respond(HttpStatusCode.Created, createdAlbum)
            }

            // Get all albums
            get {
                val albums = getAlbumsUseCase()
                call.respond(albums)
            }

            // Get album by ID
            get("/{id}") {
                val id = call.parameters["id"]?.toLongOrNull()
                    ?: throw BadRequestException("Invalid ID format")
                
                val album = getAlbumUseCase(id) ?: throw ResourceNotFoundException("Album not found")
                call.respond(album)
            }

            // Get albums by artist
            get("/artist/{artistId}") {
                val artistId = call.parameters["artistId"]?.toLongOrNull()
                    ?: throw BadRequestException("Invalid artist ID format")
                
                val albums = getAlbumsByArtistUseCase(artistId)
                call.respond(albums)
            }

            // Update album
            put("/{id}") {
                val id = call.parameters["id"]?.toLongOrNull()
                    ?: throw BadRequestException("Invalid ID format")
                
                val album = call.receive<Album>().copy(id = id)
                val updated = updateAlbumUseCase(album)
                
                if (updated) {
                    call.respond(HttpStatusCode.OK, album)
                } else {
                    throw ResourceNotFoundException("Album not found")
                }
            }

            // Delete album
            delete("/{id}") {
                val id = call.parameters["id"]?.toLongOrNull()
                    ?: throw BadRequestException("Invalid ID format")
                
                val deleted = deleteAlbumUseCase(id)
                
                if (deleted) {
                    call.respond(HttpStatusCode.NoContent)
                } else {
                    throw ResourceNotFoundException("Album not found")
                }
            }
        }
    }
}

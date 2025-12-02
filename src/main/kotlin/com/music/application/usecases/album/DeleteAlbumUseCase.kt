package com.music.application.usecases.album

import com.music.domain.repository.AlbumRepository

class DeleteAlbumUseCase(private val albumRepository: AlbumRepository) {
    suspend operator fun invoke(id: Long): Boolean = albumRepository.delete(id)
}

package com.music.application.usecases.album

import com.music.domain.repository.AlbumRepository

class GetAlbumUseCase(private val albumRepository: AlbumRepository) {
    suspend operator fun invoke(id: Long) = albumRepository.getById(id)
}

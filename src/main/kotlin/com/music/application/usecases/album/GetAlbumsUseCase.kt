package com.music.application.usecases.album

import com.music.domain.repository.AlbumRepository

class GetAlbumsUseCase(private val albumRepository: AlbumRepository) {
    suspend operator fun invoke() = albumRepository.getAll()
}

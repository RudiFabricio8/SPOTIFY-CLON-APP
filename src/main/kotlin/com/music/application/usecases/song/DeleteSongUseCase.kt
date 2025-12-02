package com.music.application.usecases.song

import com.music.domain.repository.SongRepository

class DeleteSongUseCase(private val songRepository: SongRepository) {
    suspend operator fun invoke(id: Long): Boolean = songRepository.delete(id)
}

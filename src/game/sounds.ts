import { Audio } from 'expo-av';

export const playSound = async (type: 'move' | 'capture' | 'check' | 'gameover') => {
    try {
        let soundModule;
        switch (type) {
            case 'move':
                soundModule = require('../../assets/sounds/move.mp3');
                break;
            case 'capture':
                soundModule = require('../../assets/sounds/capture.mp3');
                break;
            case 'check':
                soundModule = require('../../assets/sounds/check.mp3');
                break;
            case 'gameover':
                soundModule = require('../../assets/sounds/gameover.mp3');
                break;
        }
        
        if (soundModule) {
            const { sound } = await Audio.Sound.createAsync(soundModule);
            await sound.playAsync();
            
            // Unload sound from memory after it finishes playing
            sound.setOnPlaybackStatusUpdate((status) => {
                if (status.isLoaded && status.didJustFinish) {
                    sound.unloadAsync();
                }
            });
        }
    } catch (e) {
        console.warn("Failed to play sound", e);
    }
};

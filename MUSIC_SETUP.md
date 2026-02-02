# 🎵 How to Add Background Music to Your Portfolio

## Quick Setup (3 Steps)

### Step 1: Download Free Music

Choose one of these **royalty-free** music sources:

**Recommended Sites:**
1. **Mixkit** - https://mixkit.co/free-stock-music/chill/
   - 75+ free chillout tracks
   - No attribution required
   - Direct MP3 download

2. **Chosic** - https://www.chosic.com/free-music/chill/
   - 338+ chill background tracks
   - Free for YouTube & commercial use
   - Easy download

3. **Bensound** - https://www.bensound.com/royalty-free-music/track/chill
   - High-quality chill beats
   - Free with attribution
   - Professional sound

### Step 2: Prepare Your File

1. Download a chill/lo-fi instrumental track (2-3 minutes recommended)
2. Make sure it's in **MP3 format**
3. Rename the file to: `background-music.mp3`

### Step 3: Add to Your Project

1. Copy your `background-music.mp3` file
2. Paste it into: `public/assets/` folder
3. That's it! The music player will automatically detect it

## 🎮 Testing the Music Player

1. Start your dev server:
   ```bash
   npm run dev
   ```

2. Open your browser to `http://localhost:5173`

3. Look for the **purple circular button** in the **top-left corner**

4. Click to play/pause music

5. Hover over the button to see the **volume slider**

## 🎨 Music Player Features

✅ **Play/Pause Control** - Click the button to toggle music  
✅ **Volume Slider** - Hover to reveal and adjust volume (0-100%)  
✅ **Persistent Playback** - Music continues when navigating pages  
✅ **Visual Feedback** - Green dot pulses when music is playing  
✅ **Error Detection** - Red dot shows if audio file is missing  
✅ **Smooth Animations** - Glassmorphism design with fade effects

## 🔧 Troubleshooting

**Problem: Music player shows a red dot**
- **Solution:** The audio file is missing. Make sure `background-music.mp3` is in `public/assets/`

**Problem: Music doesn't play when clicked**
- **Solution:** Check browser console for errors. Some browsers block autoplay.

**Problem: Want to use a different filename?**
- **Solution:** Edit `src/components/MusicPlayer.jsx` line 62:
  ```jsx
  src="/assets/your-music-file.mp3"  // Change this
  ```

## 📝 Recommended Music Settings

- **Format:** MP3 (best browser compatibility)
- **File Size:** Under 5MB (faster loading)
- **Duration:** 2-3 minutes (good for looping)
- **Genre:** Lo-fi, Ambient, Chillhop, Downtempo
- **Volume:** Set to 30% by default (adjustable by user)

## 🎼 Example Free Tracks

Here are some specific free tracks you can use:

1. **"Chill Day" by Lakey Inspired** (YouTube Audio Library)
2. **"Lofi Study" by FASSounds** (Mixkit)
3. **"Relaxing Piano" by Fesliyan Studios**

---

**Note:** Always check the license requirements for any music you download. Most free sites require attribution in your project description or credits.

## 🚀 You're All Set!

Once you add the music file, your portfolio will have a professional background music player that visitors can control. The music will create a relaxing atmosphere while they browse your work!

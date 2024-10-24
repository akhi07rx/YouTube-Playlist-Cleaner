# YouTube Watch Later Playlist Cleaner

A powerful and configurable JavaScript-based tool to efficiently clean up your YouTube Watch Later playlist. This script automates the process of removing videos from your Watch Later playlist, handling thousands of videos with reliable execution and smart pacing to avoid rate limiting.

## 🌟 Features

- **Batch Processing**: Intelligently processes videos in configurable batches
- **Smart Pacing**: Automatic breaks between batches to avoid rate limiting
- **Error Recovery**: Automatic retries for failed deletions
- **Progress Tracking**: Real-time console logging of deletion progress
- **Configurable Settings**: Easily adjustable parameters for different needs
- **Debug Mode**: Detailed logging for troubleshooting


## 🚀 Installation & Usage

1. **Open Your Watch Later Playlist**

   - Go to YouTube
   - Navigate to your Watch Later playlist
   - Make sure you're logged into your account

2. **Open Developer Tools**

   - Press `F12` or right-click and select "Inspect"
   - Go to the "Console" tab

3. **Run the Script**
   - Copy the entire script content
   - Paste it into the console
   - Press Enter to start the cleanup process

## ⚙️ Configuration

The script comes with configurable options at the top:

```javascript
const config = {
  batchSize: 50, // Number of videos per batch
  deletionDelay: 800, // Milliseconds between deletions
  batchBreakTime: 1000 * 60 * 2, // Break time between batches (2 min)
  maxRetries: 3, // Retry attempts for failed deletions
  debugMode: true, // Enable detailed logging
};
```

### Configuration Options Explained

| Option           | Description                                       | Default | Recommended Range |
| ---------------- | ------------------------------------------------- | ------- | ----------------- |
| `batchSize`      | Number of videos to process before taking a break | 50      | 20-100            |
| `deletionDelay`  | Delay between each video deletion (ms)            | 800     | 500-1000          |
| `batchBreakTime` | Break duration between batches (ms)               | 120000  | 60000-300000      |
| `maxRetries`     | Maximum retry attempts for failed deletions       | 3       | 2-5               |
| `debugMode`      | Enable detailed console logging                   | true    | true/false        |

## 📊 Console Output

The script provides detailed console output with color-coding:

- 🔵 Blue: Information messages
- 🟢 Green: Success messages
- 🔴 Red: Error messages

Example output:

```
Starting Watch Later cleanup...
Batch size: 50, Delay: 800ms
Video removed successfully
Batch 1 complete. Deleted so far: 50
Taking a 120s break...
```

## ⚠️ Important Notes

1. **Rate Limiting**:

   - YouTube may have rate limits for automated actions
   - The script includes breaks to avoid triggering these limits
   - Adjust timing parameters if you encounter issues

2. **Browser Focus**:

   - Keep the YouTube tab active while the script runs
   - Avoid switching to other tabs/windows
   - Don't minimize the browser

3. **Playlist Size**:

   - Works with playlists of any size
   - Larger playlists will take longer to process
   - Progress is logged in real-time

4. **Error Handling**:
   - Failed deletions are automatically retried
   - Errors are logged to the console
   - Script continues running even if some deletions fail

## 🔧 Troubleshooting

If you encounter issues:

1. **Script Stops Working**

   - Refresh the page
   - Wait a few minutes
   - Try running again with increased delays

2. **High Failure Rate**

   - Increase `deletionDelay`
   - Decrease `batchSize`
   - Ensure stable internet connection

3. **YouTube UI Changes**
   - The script may need updates if YouTube changes their interface
   - Check for updated versions of the script

## 🛠️ Advanced Usage

### Customizing for Different Needs

For slower connections:

```javascript
const config = {
  batchSize: 30,
  deletionDelay: 1000,
  batchBreakTime: 1000 * 60 * 3,
  maxRetries: 4,
  debugMode: true,
};
```

For faster connections:

```javascript
const config = {
  batchSize: 75,
  deletionDelay: 600,
  batchBreakTime: 1000 * 60,
  maxRetries: 2,
  debugMode: true,
};
```

## 📝 Contributing

Feel free to submit issues and enhancement requests!

## ⚖️ License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Inspired by various YouTube playlist management scripts
- Enhanced with robust error handling and smart pacing
- Developed to help users manage large Watch Later playlists efficiently

---

**Note**: This script is provided as-is, without any guarantees. Use at your own risk and responsibility. Always ensure you have backups of important playlists before running automation scripts.

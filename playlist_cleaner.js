
const config = {
    batchSize: 50,                    
    deletionDelay: 800,              
    batchBreakTime: 1000 * 60 * 2,   
    maxRetries: 3,                    
    debugMode: true                   
};

const logger = {
    info: (msg) => config.debugMode && console.log(`%c${msg}`, 'color: #8ab4f8'),
    error: (msg) => config.debugMode && console.log(`%c${msg}`, 'color: #f87171'),
    success: (msg) => config.debugMode && console.log(`%c${msg}`, 'color: #86efac')
};

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
async function deleteVideo(video, retryCount = 0) {
    try {
        if (!video) {
            logger.error('Video element not found');
            return false;
        }
        
        const menuButton = video.querySelector('#primary button[aria-label="Action menu"]');
        if (!menuButton) {
            logger.error('Menu button not found');
            return false;
        }
        menuButton.click();
        await sleep(300);
        
        const removeButtons = document.evaluate(
            '//span[contains(text(),"Remove from")]',
            document,
            null,
            XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
            null
        );

        if (removeButtons.snapshotLength === 0) {
            logger.error('Remove button not found');
            return false;
        }

        removeButtons.snapshotItem(0).click();
        logger.success(`Video removed successfully`);
        return true;

    } catch (error) {
        logger.error(`Error during deletion: ${error.message}`);
        if (retryCount < config.maxRetries) {
            logger.info(`Retrying... (${retryCount + 1}/${config.maxRetries})`);
            await sleep(1000);
            return deleteVideo(video, retryCount + 1);
        }
        return false;
    }
}

async function cleanWatchLater() {
    let totalDeleted = 0;
    let batchCount = 0;
    let failures = 0;

    logger.info('Starting Watch Later cleanup...');
    logger.info(`Batch size: ${config.batchSize}, Delay: ${config.deletionDelay}ms`);

    while (true) {
        const videos = document.getElementsByTagName('ytd-playlist-video-renderer');
        
        if (videos.length === 0) {
            logger.success('No more videos found. Cleanup complete!');
            logger.info(`Total deleted: ${totalDeleted}, Failed: ${failures}`);
            break;
        }
        
        for (let i = 0; i < config.batchSize && i < videos.length; i++) {
            const success = await deleteVideo(videos[0]);
            if (success) {
                totalDeleted++;
            } else {
                failures++;
            }
            await sleep(config.deletionDelay);
        }

        batchCount++;
        logger.info(`Batch ${batchCount} complete. Deleted so far: ${totalDeleted}`);
        
        if (videos.length > config.batchSize) {
            logger.info(`Taking a ${config.batchBreakTime/1000}s break...`);
            await sleep(config.batchBreakTime);
        }
    }
}


cleanWatchLater().catch(error => {
    logger.error(`Fatal error: ${error.message}`);
});
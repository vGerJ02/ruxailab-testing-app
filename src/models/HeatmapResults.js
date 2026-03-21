export default class HeatmapResults {
  /**
   * Constructs a new HeatmapResults instance.
   * @param {Object} param0 - An object containing taskId, heatmapData, and heatmapDimensions.
   * @param {string} param0.taskId - The id of the task.
   * @param {Map<String, Object>} param0.heatmapData - A map that represents the heatmap data. Each key is a URL, and its corresponding value is an object of the form { x: number, y: number, time: number } where 'x' and 'y' are the click coordinates and 'time' is the timestamp of the click event.
   * @param {Map<String, Object>} param0.heatmapDimensions - A map that represents the dimensions and image of the heatmap. Each key is a URL, and its corresponding value is an object in the form { dataUrl: String, width: number, height: number }. Here, 'dataUrl' is the data URL of the image, 'width' is the width of the heatmap, and 'height' is the height of the heatmap.
   */
  constructor({ taskId, heatmapData, heatmapDimensions } = {}) {
    this.taskId = taskId ?? null
    
    // Validate heatmapData
    if (heatmapData && !(heatmapData instanceof Map)) {
      throw new TypeError('heatmapData must be a Map')
    }
    this.heatmapData = heatmapData ?? null
    
    // Validate heatmapDimensions
    if (heatmapDimensions && !(heatmapDimensions instanceof Map)) {
      throw new TypeError('heatmapDimensions must be a Map')
    }
    this.heatmapDimensions = heatmapDimensions ?? null
  }

  /**
   * Converts data to a HeatmapResults instance.
   * @param {Object|HeatmapResults} data - The data to convert.
   * @returns {HeatmapResults} A HeatmapResults instance.
   */
  static toHeatmapResults(data) {
    if (data instanceof HeatmapResults) {
      return data
    }
    return new HeatmapResults(data)
  }

  /**
   * Creates a HeatmapResults instance from Firestore data.
   * @param {Object} data - The Firestore document data.
   * @returns {HeatmapResults} A HeatmapResults instance.
   */
  static fromFirestore(data) {
    return new HeatmapResults({
      taskId: data.taskId,
      heatmapData: data.heatmapData 
        ? new Map(Object.entries(data.heatmapData)) 
        : null,
      heatmapDimensions: data.heatmapDimensions 
        ? new Map(Object.entries(data.heatmapDimensions)) 
        : null,
    })
  }

  /**
   * Converts the instance to a Firestore-compatible object.
   * Maps are converted to plain objects since Firestore doesn't support Map objects.
   * @returns {Object} Firestore-compatible object.
   */
  toFirestore() {
    return {
      taskId: this.taskId,
      heatmapData: this.heatmapData 
        ? Object.fromEntries(this.heatmapData) 
        : null,
      heatmapDimensions: this.heatmapDimensions 
        ? Object.fromEntries(this.heatmapDimensions) 
        : null,
    }
  }

  /**
   * Gets click data for a specific URL.
   * @param {string} url - The URL to get click data for.
   * @returns {Object|null} Click data object or null if not found.
   */
  getClicksForUrl(url) {
    return this.heatmapData?.get(url) ?? null
  }

  /**
   * Gets dimensions data for a specific URL.
   * @param {string} url - The URL to get dimensions for.
   * @returns {Object|null} Dimensions object or null if not found.
   */
  getDimensionsForUrl(url) {
    return this.heatmapDimensions?.get(url) ?? null
  }

  /**
   * Gets all URLs that have heatmap data.
   * @returns {string[]} Array of URLs.
   */
  getUrls() {
    return this.heatmapData ? Array.from(this.heatmapData.keys()) : []
  }

  /**
   * Checks if heatmap data exists for a specific URL.
   * @param {string} url - The URL to check.
   * @returns {boolean} True if data exists, false otherwise.
   */
  hasDataForUrl(url) {
    return this.heatmapData?.has(url) ?? false
  }

  /**
   * Gets the total number of URLs with heatmap data.
   * @returns {number} Count of URLs.
   */
  getUrlCount() {
    return this.heatmapData?.size ?? 0
  }

  /**
   * Gets all heatmap data as a plain object.
   * @returns {Object|null} Plain object representation of heatmap data.
   */
  getHeatmapDataAsObject() {
    return this.heatmapData ? Object.fromEntries(this.heatmapData) : null
  }

  /**
   * Gets all dimension data as a plain object.
   * @returns {Object|null} Plain object representation of dimension data.
   */
  getDimensionsAsObject() {
    return this.heatmapDimensions ? Object.fromEntries(this.heatmapDimensions) : null
  }
}

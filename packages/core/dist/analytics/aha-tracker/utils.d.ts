/**
 * Utility functions for aha tracking
 */
/**
 * Generate a unique session ID
 */
export declare function generateSessionId(): string
/**
 * Get the current timezone
 */
export declare function getTimezone(): string
/**
 * Detect device type based on viewport width
 */
export declare function detectDeviceType(): 'mobile' | 'tablet' | 'desktop'
/**
 * Detect browser from user agent
 */
export declare function detectBrowser(): string | undefined
/**
 * Detect operating system from platform
 */
export declare function detectOS(): string | undefined

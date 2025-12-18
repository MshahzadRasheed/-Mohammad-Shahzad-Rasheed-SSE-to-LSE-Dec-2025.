/**
 * Environment Configuration
 * 
 * This module provides centralized access to environment variables.
 * Uses react-native-config for reading .env files based on build configuration.
 * 
 * Environment files:
 * - .env.sigma: Sigma/QA environment
 * - .env.live: Production environment
 * - .env: Default development environment
 */

import Config from 'react-native-config';

export interface EnvironmentConfig {
    apiBaseUrl: string;
    rudiApiUrl: string;
    websocketUrl: string;
    environment: 'sigma' | 'live' | 'development';
    isDevelopment: boolean;
    isProduction: boolean;
}

/**
 * Environment configuration object with typed access to environment variables
 */
export const Environment: EnvironmentConfig = {
    apiBaseUrl: Config.API_BASE_URL || 'https://sigma.imprint.live/backend',
    rudiApiUrl: Config.RUDI_API_URL || 'https://rudi-func-qa.azurewebsites.net/api/chat-service',
    websocketUrl: Config.WEBSOCKET_URL || 'wss://sigma.imprint.live/ws',
    environment: (Config.ENVIRONMENT as EnvironmentConfig['environment']) || 'development',
    
    get isDevelopment(): boolean {
        return this.environment === 'development' || this.environment === 'sigma';
    },
    
    get isProduction(): boolean {
        return this.environment === 'live';
    },
};

/**
 * Helper function to check if current environment is Sigma
 */
export const isSigmaEnvironment = (): boolean => {
    return Environment.environment === 'sigma' || Environment.apiBaseUrl.includes('sigma');
};

/**
 * Helper function to check if current environment is Live/Production
 */
export const isLiveEnvironment = (): boolean => {
    return Environment.environment === 'live';
};

export default Environment;


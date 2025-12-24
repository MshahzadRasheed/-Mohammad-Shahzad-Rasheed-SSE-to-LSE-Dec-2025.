/**
 * usePaginatedScroll Hook
 *
 * Custom hook for implementing infinite scroll pagination in chat messages.
 * Automatically loads more messages when user scrolls to the top of the list.
 *
 * @module hooks/usePaginatedScroll
 */

import {
    Keyboard,
    NativeScrollEvent,
    NativeSyntheticEvent,
} from 'react-native';
import React from 'react';
import { debounce } from 'lodash';
import { useCallback } from 'react';
import { EventScrollType } from '../types';

/**
 * Props interface for usePaginatedScroll hook
 */
interface ScrollProps {
    /** Indicates if data is currently being loaded */
    loading: boolean;
    /** Indicates if all available data has been loaded */
    allDataLoaded: boolean;
    /** State setter for current page number */
    setPage: React.Dispatch<React.SetStateAction<number>>;
    /** State setter for loading state */
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

/**
 * Custom hook for paginated scroll functionality
 *
 * @param props - Hook configuration
 * @returns Object containing listViewProps for FlatList/ScrollView
 *
 * @example
 * const { listViewProps } = usePaginatedScroll({
 *   loading: false,
 *   allDataLoaded: false,
 *   setPage: setPageState,
 *   setLoading: setLoadingState
 * });
 */
export const usePaginatedScroll = ({
    loading,
    allDataLoaded,
    setPage,
    setLoading,
}: ScrollProps) => {
    /**
     * Debounced handler for when scroll reaches end
     * Increments page if not loading and more data available
     */
    const handleEndReached = useCallback(
        debounce(() => {
            if (!loading && !allDataLoaded) {
                // Load next page of messages
                setPage((prevPage) => prevPage + 1);
            } else {
                // Reset loading state if no more data
                setLoading(false);
            }
        }, 300), // 300ms debounce to prevent rapid API calls
        [loading, allDataLoaded]
    );

    /**
     * Determines if scroll position is close to the top
     * Used to trigger loading of older messages
     *
     * @param layoutMeasurement - Current visible layout dimensions
     * @param contentOffset - Current scroll offset
     * @param contentSize - Total content dimensions
     * @returns true if within 20px of top
     */
    const isCloseToTop = ({
        layoutMeasurement,
        contentOffset,
        contentSize,
    }: {
        layoutMeasurement: EventScrollType;
        contentOffset: { x: number; y: number };
        contentSize: EventScrollType;
    }): boolean => {
        // 20px threshold for triggering load
        return (
            contentSize.height - layoutMeasurement.height - 20 <=
            contentOffset.y
        );
    };

    /**
     * Handles scroll events and triggers pagination when near top
     */
    const handleScroll = useCallback(
        (nativeEvent: NativeScrollEvent) => {
            if (isCloseToTop(nativeEvent)) {
                handleEndReached();
            }
        },
        [handleEndReached, isCloseToTop]
    );

    /**
     * Props to be spread on FlatList/ScrollView component
     * Configures scroll behavior and pagination triggers
     */
    const listViewProps = {
        scrollEventThrottle: 100, // Throttle scroll events for performance
        onScroll: ({
            nativeEvent,
        }: NativeSyntheticEvent<NativeScrollEvent>) => {
            if (isCloseToTop(nativeEvent)) {
                Keyboard.dismiss(); // Hide keyboard when scrolling up
                handleScroll(nativeEvent);
            }
        },
        onEndReachedThreshold: 0.1, // Trigger at 10% from end
        onEndReached: handleEndReached,
    };

    return { listViewProps };
};

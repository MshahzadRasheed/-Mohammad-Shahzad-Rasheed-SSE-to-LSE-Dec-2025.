import {
    Keyboard,
    NativeScrollEvent,
    NativeSyntheticEvent,
} from 'react-native';
import React from 'react';
import { debounce } from 'lodash';
import { useCallback } from 'react';
import { EventScrollType } from '../types';

interface ScrollProps {
    loading: boolean;
    allDataLoaded: boolean;
    setPage: React.Dispatch<React.SetStateAction<number>>;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const usePaginatedScroll = ({
    loading,
    allDataLoaded,
    setPage,
    setLoading,
}: ScrollProps) => {
    const handleEndReached = useCallback(
        debounce(() => {
            if (!loading && !allDataLoaded) {
                setPage((prevPage) => prevPage + 1);
            } else {
                setLoading(false);
            }
        }, 300),
        [loading, allDataLoaded]
    );

    const isCloseToTop = ({
        layoutMeasurement,
        contentOffset,
        contentSize,
    }: {
        layoutMeasurement: EventScrollType;
        contentOffset: { x: number; y: number };
        contentSize: EventScrollType;
    }): boolean => {
        return (
            contentSize.height - layoutMeasurement.height - 20 <=
            contentOffset.y
        );
    };

    const handleScroll = useCallback(
        (nativeEvent: NativeScrollEvent) => {
            if (isCloseToTop(nativeEvent)) {
                handleEndReached();
            }
        },
        [handleEndReached, isCloseToTop]
    );

    const listViewProps = {
        scrollEventThrottle: 100,
        onScroll: ({
            nativeEvent,
        }: NativeSyntheticEvent<NativeScrollEvent>) => {
            if (isCloseToTop(nativeEvent)) {
                Keyboard.dismiss();
                handleScroll(nativeEvent);
            }
        },
        onEndReachedThreshold: 0.1,
        onEndReached: handleEndReached,
    };

    return { listViewProps };
};

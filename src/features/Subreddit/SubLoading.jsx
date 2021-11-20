import React from 'react';
import './SubLoading.css';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export const SubLoading = () => {

    return (
        
        <div className="subload-loading">
            <SkeletonTheme baseColor="var(--color-bind)" highlightColor="var(--color-text-body)" >
                <div className="skeleton-main-subload" >
                    <div className="skeleton-subload-details">
                        <div className="skeleton-avatar-subload">
                            <Skeleton circle={true} height={32} width={32} duration={2}/>
                        </div>
                        <div>
                            <Skeleton height={32} width={120} duration={2}/>                       
                        </div>
                    </div>
                </div>
            </SkeletonTheme>
         </div>
    )
}
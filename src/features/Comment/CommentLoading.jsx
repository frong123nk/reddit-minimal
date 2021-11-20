import React from 'react';
import './CommentLoading.css';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export const CommentLoading = () => {

    return (
        
        <div className="comment-loading">
            <SkeletonTheme baseColor="var(--color-bind)" highlightColor="var(--color-text-body)" >
                <div className="skeleton-main-comment" >
                    <div className="skeleton-comment-details">
                        <div className="skeleton-avatar-comment">
                            <Skeleton circle={true} height={32} width={32} duration={2}/>
                        </div>
                        <div>
                            <Skeleton height={14} width={120} duration={2}/>                       
                        </div>
                    </div>
                    <div>
                        <Skeleton height={18} duration={3}/>
                    </div>
                    <div >
                        <Skeleton height={18} width={200} duration={1.75}/>
                    </div>
                </div>
            </SkeletonTheme>
         </div>
    )
}

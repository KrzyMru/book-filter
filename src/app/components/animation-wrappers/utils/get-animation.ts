const getAnimation = (variant: string) => {
    if(variant === 'header')
        return 'animate-slide-in-header';
    else if(variant === 'work')
        return 'animate-slide-in-work'
    else
        return '';
}

export default getAnimation;
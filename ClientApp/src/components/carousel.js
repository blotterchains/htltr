import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    CarouselControl,
    Carousel,
    CarouselItem,
    CarouselIndicators,
    Button
} from 'reactstrap';
  
function CS(item) {
    // State for Active index
    const [activeIndex, setActiveIndex] = React.useState(0);
  
    // State for Animation
    const [animating, setAnimating] = React.useState(false);
  
    // Sample items for Carousel
    const items = item.item
  
    // Items array length
    const itemLength = items.length - 1
  
    // Previous button for Carousel
    const previousButton = () => {
        if (animating) return;
        const nextIndex = activeIndex === 0 ?
            itemLength : activeIndex - 1;
        setActiveIndex(nextIndex);
    }
  
    // Next button for Carousel
    const nextButton = () => {
        if (animating) return;
        const nextIndex = activeIndex === itemLength ?
            0 : activeIndex + 1;
        setActiveIndex(nextIndex);
    }
  
    // Carousel Item Data
    const carouselItemData = items.map((item) => {
        return (
            <CarouselItem
                key={item.src}
                onExited={() => setAnimating(false)}
                onExiting={() => setAnimating(true)}
            >
                <img 
                style={{width:"60%",height:"40%"}}
                src={require(`../../../Uploads/${item.filename}`).default} />
                <br/>
                <Button
                // value={item.hid}
                onClick={()=>{

                }}
                >
                    حذف
                </Button>
            </CarouselItem>
        );
    });
  
    return (
        <div style={{
            display: 'block', width: 320, padding: 30
        }}>
            <h8>عکس ها</h8>
            <Carousel previous={previousButton} next={nextButton}
                activeIndex={activeIndex}>
                <CarouselIndicators items={items}
                    activeIndex={activeIndex}
                    onClickHandler={(newIndex) => {
                        if (animating) return;
                        setActiveIndex(newIndex);
                    }} />
                {carouselItemData}
                <CarouselControl directionText="Prev"
                    direction="prev" onClickHandler={previousButton} />
                <CarouselControl directionText="Next"
                    direction="next" onClickHandler={nextButton} />
            </Carousel>
        </div >
    );
}
  
export default CS;
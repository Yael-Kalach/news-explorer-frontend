import NewsCard from "../NewsCard/NewsCard";

function NewsCardList() {
    return (
      <div className="news-card-list">
        <div className="news-card-list__container">
          <NewsCard 
          image={'https://images.unsplash.com/photo-1518981154746-fdc34f7b0548?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=789&q=80'} 
          title={"Everyone Needs a Special 'Sit Spot' in Nature"} 
          keyword={'Nature'}
          date={'November 4, 2020'}
          description={`Ever since I read Richard Louv's influential book, "Last Child in the Woods," the idea of having a special "sit spot" has stuck with me. This advice, which Louv attributes to nature educator Jon Young, is for both adults and children to find...`} 
          source={'treehugger'} />

          <NewsCard
          image={'https://images.unsplash.com/photo-1502379584702-fd42ac34d0c0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'} 
          title={"Nature makes you better"} 
          keyword={'Nature'}
          date={'February 19, 2019'}
          description={`We all know how good nature can make us feel. We have known it for millennia: the sound of the ocean, the scents of a forest, the way dappled sunlight dances through leaves.`} 
          source={'national geographic'} />

          <NewsCard
          image={'https://images.unsplash.com/photo-1602391950852-88bf9be72b24?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1127&q=80'} 
          title={"Grand Teton Renews Historic Crest Trail"} 
          keyword={'Parks'}
          date={'November 4, 2020'}
          description={`The linking together of the Cascade and Death Canyon trails, at their heads, took place on October 1, 1933, and marked the first step in the realization of a plan whereby the hiker will be...`} 
          source={'National parks traveler'} />
          
          <NewsCard
          image={'https://images.unsplash.com/photo-1554592977-9fcccf7b4e25?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'} 
          title={"Nostalgic Photos of Tourists in U.S. National Parks"} 
          keyword={'Yellowstone'}
          date={'October 19, 2020'}
          description={`Uri Løvevild Golman and Helle Løvevild Golman are National Geographic Explorers and conservation photographers who just completed a project and book they call their love letter to...`} 
          source={'national geographic'} />

          <NewsCard
          image={'https://images.unsplash.com/photo-1469980098053-382eb10ba017?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'} 
          title={"Scientists Don't Know Why Polaris Is So Weird "} 
          keyword={'Photography'}
          date={'March 16, 2020'}
          description={`Humans have long relied on the starry sky to push into new frontiers, sail to the very edge of the world and find their way back home again. Even animals look to the stars to guide them.`} 
          source={'treehugger'} />
        </div>
      </div>      
    );
  }
  
  export default NewsCardList;
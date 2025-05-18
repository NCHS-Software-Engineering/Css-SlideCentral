
import '../styles/styles.css';
import timeWidget from '../images/timeWidget.png';
import weatherWidget from '../images/weatherWidget.png';
import periodCountdownWidget from '../images/periodCountdownWidget.png';
import activitiesWidget from '../images/activityWidget.png';
// specific details need to be changed once CSS is fixed
function WidgetPage() {
    return (
        <>
     <Helmet>
    <title>Widget Page</title>
    <meta charSet="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="description" content="Learn how to navigate CSS-SlideCentral" />
  <meta name="author" content="Isaac Liu" />
   </Helmet>
        <link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap"
/>
        <link rel="stylesheet" href="styles.css"></link>
        <h1 class="page-title">Widgets</h1>
        
        <div class="all-containers">
        <div class="widgets-container">
            
        <img src={timeWidget} width="300" height="150" alt=""/>
        <div class="widgetCard">
        <p class="widget-title">Time Widget</p>
        <p class="widgetDesc">Used to show the current time</p>
        <p class="widgetDim">Dimensions: 3x1</p>
        </div>
            </div>

            <div class="widgets-container">
        <img src={weatherWidget} width="202.5" height="162" alt=""/>
        <div class="widgetCard">
        <p class="widget-title">Weather Widget</p>
        <p class="widgetDesc">Used to show the current weather</p>
        <p class="widgetDim">Dimensions: 2x2</p>
        </div>
            </div>

            <div class="widgets-container">
        <img src={periodCountdownWidget} width="300" height="120" alt=""/>
        <div class="widgetCard">
        <p class="widget-title">Countdown Widget</p>
        <p class="widgetDesc">Used to show a countdown to the next period</p>
        <p class="widgetDim">Dimensions: 5x1</p>
        </div>
            </div>

            <div class="widgets-container">
        <img src={activitiesWidget} width="165" height="220" alt="" class="activity-image"/>
        <div class="widgetCard">
        <p class="widget-title">Activity Widget</p>
        <p class="widgetDesc">Used to show the activities at school for the day</p>
        <p class="widgetDim">Dimensions: 6x5</p>
        </div>
            </div>
        <p class="more-widgets">More widgets to come!</p>
            </div>
            </>
    );
}
export default WidgetPage;
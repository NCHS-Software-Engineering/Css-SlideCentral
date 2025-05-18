
import '../styles/styles.css';

// specific details need to be changed once CSS is fixed
function faq() {
    return (
        <>
      
      <Helmet>
    <title>FAQ</title>
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
        <h1 class="page-title">FAQ</h1>

        <div class="questions">
        <h3>Domains</h3>
        <h2>Can students edit the slides in the slideshow?</h2>
        <p>No, only teachers can but they would have to give permission to students to edit the slides.</p>
        <ul>
  <li>Only teachers and students with special permission will have access to add, edit, and publish activities</li>
  <li>To get permission, you need to contact your activity sponsor</li>
  <li>The sponsor should then contact an admin to grant the student the requested permissions</li>
</ul>


        <h2>What can a student access in this software?</h2>
        <ul>
  <li>All students can access the calendar, activity slideshow, and the three help pages.</li>
  <li>Only permitted students will have the ability to enter, edit, and delete activites.</li>
  <li>You can get the permissions by requesting it from your sponsor.</li>
</ul>

<h2>What can a teacher access in the software?</h2>
        <ul>
  <li>All teachers can access the CSS preview and edit, as well as the calendar, activity slideshow, and the three help pages.</li>
  <li>Only permitted teachers will have the ability to enter, edit, and delete activites.</li>
  <li>You can get the permissions by requesting it from an admin.</li>
</ul>

<h2>What can admin access in the software?</h2>
        <p>An administrator can access everything included in this software, along with the ability to edit the code that makes up the software.</p>

        <h3>Other</h3>
        <h2>How does a teacher or admin display the preview?</h2>
        <ul>
  <li>First, load up the CSS preview page.</li>
  <li>Next, connect your computer to the monitor that will display the preview.</li>
  <li>Start the screencast of the preview once connected.</li>
</ul>
<h2>Is my personal information safe?</h2>
        <p>Other than your school google account, nothing else is used.</p>
        
        <h2>Why can't I log in with another google account?</h2>
        <p>For security reasons, only users with D203 google account an access the full extent of this software. To log in, please use your school google account.</p>



        <h2>What if there's a question that I can't answer here or there is error with the software?</h2>
        <p>If that's the case, please contact an admin or one of the developers:</p>
        <ul>


  <li>jsparves@stu.naperville203.org</li>
  <li>isliu@stu.naperville203.org</li>
  <li>mkantipov@stu.naperville203.org</li>
  <li>arvedavyas@stu.naperville203.org</li>
</ul>


</div>
            </>
    );
}
export default faq;
# My Producivity App

This project was inspired by Jira, Notion, and Craft and uses Next.js, React, TailwindCSS on the frontend and Java, Maven, Spring Boot and MySQL on the backend.

This project was inspired by Jira’s kanban board, Notion’s Table & calendar, and Craft’s note taking

<details closed>
<summary>
<h2>Backstory</h2>
</summary>

I have been using Jira’s kanban board to manage and track my progress on my todos.  I wanted to combine it with a calendar where I can easier see my due dates.  While learning to use Notion I was inspired it's look and feel, configurability, and user interface.  This project combines a number of the feature that most fits my needs as a productivity tool.

</details>

<details closed>
<summary>
<h2>Feature Specification</h2>
</summary>

Create and manage projects and tasks.
Dashboard
- Task
Projects have can be viewed in 3 ways
- Table View
- Calendar View
- Board View (i.e. Kabana board)

</details>

<details open>
<summary>
<h2>Project Folder Structure</h2>
</summary>

```
├── backend
│   ├── .mvn
│   │    └── wrapper
│   │        └──
│   ├── .vscode
│   │    └── settings.json # VS Code settings


├── public
│   ├── _redirects # Configures Netlify so that routing is handled on the client side by React Router
│   ├── manifest.json # Not modified.
│   └── index.html # Main HTML file, contains the code for Google Tag Manager and Hotjar.
├── src
│   ├── components
│   │   ├── AnimationPageTransition.tsx # .
│   │   ├── Buttons.tsx # Contains all the buttons used in the project.
│   │   ├── CardComponent.tsx #
│   │   ├── DarkModeSwitch.tsx # Dark/light mode switch
│   │   ├── Drawer.tsx #
│   │   ├── Header.tsx #
│   │   ├── LogoGlow.tsx #
│   │   ├── MainCarousel.tsx #
│   │   ├── MainComponent.tsx #
│   │   ├── Menu.tsx #
│   │   ├── MobileCardsComponent.tsx #
│   │   ├── MobileMenu.tsx #
│   │   ├── MobileSkillsComponent.tsx #
│   │   ├── MobileSkillsSideBar.tsx #
│   │   ├── ResumeIcon.tsx #
│   │   ├── Settings.tsx #
│   │   ├── SettingsDrawer.tsx #
│   │   └── SkillsComponent.tsx #
│   ├── constants
│   │   ├── MenuItems.ts
│   │   └── misc.ts #
│   ├── context
│   │   ├── AppContext.ts #
│   │   └── AppContextProvider.tsx # Contains the global states
│   ├── fonts
│   │   └──  global.scss # Global styles
│   ├── pages
│   │   ├── About.tsx # About me and about the website page
│   │   ├── Certificates.tsx # Certificates page
│   │   ├── Contact.tsx # Contact form page
│   │   ├── Home.tsx # Home / Hero page
│   │   ├── NotFound.tsx # 404 page not found
│   │   └── Projects.tsx # Projects page
│   ├── styles
│   │   └──  global.scss # Global styles
│   ├── App.test.tsx # .
│   ├── App.tsx # This is the root of the app.
│   ├── index.css # Global styles.
│   ├── index.tsx # Used for DOM rendering only.
│   ├── react-app-env.d.ts # .
│   ├── reportWebVitals.ts # .
│   ├── setupTests.ts # .
│   └── types.ts # Typescript types definitions for the project.
├── .gitignore # Files ignored by Git.
├── README.md # This file.
├── package.json # npm package manager file.
├── package-lock.json # Contains the dependencies used in the project.
├── postcss-config.json # .
├── tailwind.config.js # Tailwind CSS configuration file.
└── tsconfig.json # Typescript configuration file.
```
</details>

<details closed>
<summary>
<h2>API Documentation</h2>
</summary>

[Link to OpenAPI definition]()

</details>


<details open>
<summary>
<h2>Known Issues</h2>
</summary>

TBD

</details>

<details open>
<summary>
<h2>Future Todos</h2>
</summary>

</details>

<details open>
<summary>
<h2>Resources</h2>
</summary>
<details closed>
<summary>
<h4>Backstory</h4>
</summary>

- Add Jira and notion udemy courses to resources

</details>

<details closed>
<summary>
<h4>UI (Next.js, React, Tailwind CSS, ...)</h4>
</summary>

* [Using SASS and CSS-in-JS with Next.js](https://nextjs.org/docs/basic-features/built-in-css-support#sass-support)

* [Installing SASS with Next.js](https://nextjs.org/docs/basic-features/built-in-css-support)

* [Active navigation link in Next.js 13](https://www.js-craft.io/blog/active-link-for-navigation-menu-in-nextjs-13/)

* [Adding Context API to Next.js (Youtube)](https://www.youtube.com/watch?v=woaUOS8fqBw)

* [Unable to find draggable with id (Github Issues)](https://github.com/atlassian/react-beautiful-dnd/issues/2407).  This issue had to do with the library I used for my Kanban board.  The fix was to remove React Strict Mode.

* [Removing React Strict Mode in Next.js](https://nextjs.org/docs/api-reference/next.config.js/react-strict-mode)

* [Warning caused by browser extension](https://github.com/vercel/next.js/discussions/41816)I was getting the message "Warning: Extra attributes from the server: data-new-gr-c-s-check-loaded,data-gr-ext-installed,cz-shortcut-listen at body at html at ReactDevOverlay".  It turns out the Grammarly browser extension I had installed was causing this.

* [To get content to fill width in Tailwind CSS (Stackoverflow)](https://stackoverflow.com/questions/67252321/tailwind-cant-get-the-elements-to-fill-the-width)

* [TanStack Table React example with editable data](https://tanstack.com/table/v8/docs/examples/react/editable-data?from=reactTableV7&original=https://react-table-v7.tanstack.com/docs/examples/editable-data)

*[Editable Data - Update Cell - React Table 8 (Youtube)](https://www.youtube.com/watch?v=PZP-_zPu6vU). Despite this been in an Indian language this video cleared up how to create editable cells for me.

* [Fix for error from Tanstack Table React Example (Github Issues)](https://github.com/TanStack/table/discussions/4205)

* [Tips for Aligning Icons to Text (CSS Tricks)](https://css-tricks.com/tips-aligning-icons-text/)

* [React Calendar App tutorial (Youtube)](https://www.youtube.com/watch?v=lyRP_D0qCfk)

* [Draggable kanban board tutorial (Youtube)](https://www.youtube.com/watch?v=Vqa9NMzF3wc)

* [Create date picker from scratch in React (Youtube)](https://www.youtube.com/watch?v=CbXGyv3HI2w)

* [Draggable Calendar (CodeSandbox)](https://codesandbox.io/embed/calender-cvievv?codemirror=1)

* [Popup Menus in React with Popper.js](https://www.youtube.com/watch?v=cIUfTktVZRM).  Explain using Portal and popper.js to create a Popup menu in React.  I'm using this for my datepicker in TableView.

* [Advanced Dropdown Menu - React & CSS Animation Tutorial for Beginners (Youtube)](https://www.youtube.com/watch?v=IF6k0uZuypA).  Using react-transition-group.

* [Authentication with Next Auth and Next.js 13 (Youtube)](https://www.youtube.com/watch?v=cDWytA0V2kI)

* [NextAuth.js](https://next-auth.js.org/)

* [Using React Query with Next.js 13 App folder](https://www.youtube.com/watch?v=6lIur1E1jAQ)

* [Quickstart Tutorial for the React Data Grid from AG Grid](https://www.youtube.com/watch?v=Pr__B6HM_s4&list=PLsZlhayVgqNwHNHeqpCkSgdRV08xrKtzW&index=2)

* [TanStack Query v4 (Youtube)](https://www.youtube.com/watch?v=SPPQm0dvEes&t=15s)


* [Create object from array (Stackoverflow)](https://stackoverflow.com/questions/42974735/create-object-from-array)

</details>

<details closed>
<summary>
<h4>Backend (Spring Boot, Java, PostgreSQL, AWS, ...)</h4>
</summary>

* [The Complete Java Development Bootcamp (Udemy)](https://www.udemy.com/course/the-complete-java-development-bootcamp/).  This course was great in helping me learn the basics of Java within a week.

* [The Complete Spring Boot Development Bootcamp (Udemy)](https://www.udemy.com/course/the-complete-java-development-bootcamp/).  This course was great in helping me learn the basics of Spring Boot within a week.

* [Spring Boot in Practice (Amazon)](https://www.amazon.com/Spring-Boot-Practice-Somnath-Musib-ebook/dp/B0B3YD1PGD?ref_=ast_author_mpb)

* [Difference Between java.util.Date and java.sql.Date in Java](https://javarevisited.blogspot.com/2012/04/difference-between-javautildate-and.html)

* [Repository not extending JpaRepository](https://stackoverflow.com/questions/55756272/repository-not-extending-jparepository)

* [VS Code message: org.springframework.stereotype.Repository. Unnecessary `@Repository`vscode-spring-boot(JAVA_REPOSITORY) (Stackoverflow)](https://stackoverflow.com/questions/69909613/why-spring-data-jpa-unnecessary-repository)

* [Storing tags in MySQL database (Quora)](https://www.quora.com/What-is-the-best-and-easy-way-to-store-tags-in-MySQL-database)

* [A Simple Tagging Implementation with JPA (Baeldung)](https://www.baeldung.com/jpa-tagging)

* [An Advanced Tagging Implementation with JPA (Baeldung)](https://www.baeldung.com/jpa-tagging-advanced)

* [Error calling `jakarta.validation.Validation#buildDefaultValidatorFactory` (Stackoverflow)](https://stackoverflow.com/questions/74788826/error-calling-jakarta-validation-validationbuilddefaultvalidatorfactory)


* [@RequiredArgsConstructor and @NoArgsConstructor annotation errors - Duplicate method Project() in type Project (Stackoverflow)](https://stackoverflow.com/questions/60163928/error-duplicate-method-enquiryform-in-type-enquiryform-for-allargsconstruct)

* [Hibernate: "Field 'id' doesn't have a default value"](https://stackoverflow.com/questions/804514/hibernate-field-id-doesnt-have-a-default-value)

* [MySQL Disable Foreign Key Checks](https://www.mysqltutorial.org/mysql-disable-foreign-key-checks/).  I made a schema change and could not drop a table due to a foreign key.  After running the SQL command `SET foreign_key_checks = 0;`, I could drop the table.

</details>

</details>
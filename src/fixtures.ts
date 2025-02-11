import mongoose from "mongoose";
import { Plan } from "./schemas/Plan";
import dotenv from "dotenv";
import { User } from "./schemas/User";
import { Course } from "./schemas/Course";
import { Review } from "./schemas/Review";
import { About } from "./schemas/About";
dotenv.config();

const dropCollection = async (
  db: mongoose.Connection,
  collectionName: string,
) => {
  try {
    await db.dropCollection(collectionName);
  } catch (e) {
    console.log("=>(fixtures.ts:11)", e);
    console.log(`Collection ${collectionName} was missing, skipped drop...`);
  }
};

const run = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL!);
    const db = mongoose.connection;

    const collections = [
      "plans",
      "users",
      "courses",
      "reviews",
      "abouts",
      "messages",
    ];

    for (const collectionName of collections) {
      await dropCollection(db, collectionName);
    }

    await User.create([
      {
        firstName: "Sarah",
        lastName: "Thompson",
        email: "sarah.thompson@test.com",
        password: "testtest",
        profilePicture: "assets/images/avatar-01.png",
      },
      {
        firstName: "Michael",
        lastName: "Adams",
        email: "michael.adams@test.com",
        password: "testtest",
        profilePicture: "assets/images/avatar-02.png",
      },
      {
        firstName: "Jennifer",
        lastName: "Wilson",
        email: "jennifer.wilson@test.com",
        password: "testtest",
        profilePicture: "assets/images/avatar-03.png",
      },
      {
        firstName: "David",
        lastName: "Brown",
        email: "david.brown@test.com",
        password: "testtest",
        profilePicture: "assets/images/avatar-04.png",
      },
      {
        firstName: "Emily",
        lastName: "Johnson",
        email: "emily.johnson@test.com",
        password: "testtest",
      },
      {
        firstName: "Christopher",
        lastName: "Taylor",
        email: "christopher.taylor@test.com",
        password: "testtest",
      },
      {
        firstName: "Jessica",
        lastName: "Martinez",
        email: "jessica.martinez@test.com",
        password: "testtest",
      },
      {
        firstName: "James",
        lastName: "Anderson",
        email: "james.anderson@test.com",
        password: "testtest",
      },
    ]);

    await Plan.create(
      {
        type: "free",
        perYear: 0,
        perMonth: 0,
        name: "Free",
        features: {
          courseAccess: {
            value: true,
            title: "Access to selected free courses.",
          },
          materialsAndResources: {
            value: true,
            title: "Limited course materials and resources.",
          },
          support: { value: true, title: "Basic community support." },
          certificate: {
            value: false,
            title: "No certification upon completion.",
          },
          adds: { value: true, title: "Ad-supported platform." },
          exclusiveForumAccess: {
            value: false,
            title: "Access to exclusive Pro Plan community forums.",
          },
          earlyAccess: {
            value: false,
            title: "Early access to new courses and updates.",
          },
        },
      },
      {
        type: "paid",
        perMonth: 79,
        perYear: 700,
        name: "Pro",
        features: {
          courseAccess: {
            value: true,
            title: "Unlimited access to all courses.",
          },
          materialsAndResources: {
            value: true,
            title: "Unlimited course materials and resources.",
          },
          support: { value: true, title: "Priority support from instructors." },
          certificate: {
            value: true,
            title: "Course completion certificates.",
          },
          adds: { value: true, title: "Ad-free experience." },
          exclusiveForumAccess: {
            value: true,
            title: "Access to exclusive Pro Plan community forums.",
          },
          earlyAccess: {
            value: true,
            title: "Early access to new courses and updates.",
          },
        },
      },
    );

    const user_1 = await User.findOne({ email: "sarah.thompson@test.com" });
    const user_2 = await User.findOne({ email: "michael.adams@test.com" });
    const user_3 = await User.findOne({ email: "jennifer.wilson@test.com" });
    const user_4 = await User.findOne({ email: "david.brown@test.com" });
    const user_5 = await User.findOne({ email: "emily.johnson@test.com" });
    const user_6 = await User.findOne({ email: "christopher.taylor@test.com" });
    const user_7 = await User.findOne({ email: "jessica.martinez@test.com" });
    const user_8 = await User.findOne({ email: "james.anderson@test.com" });

    const courseDescription = {
      course1:
        "Learn the fundamentals of web design, including HTML, CSS, and responsive design principles. Develop the skills to create visually appealing and user-friendly websites.",
      course2:
        "Master the art of creating intuitive user interfaces (UI) and enhancing user experiences (UX). Learn design principles, wireframing, prototyping, and usability testing techniques.",
      course3:
        "Dive into the world of mobile app development. Learn to build native iOS and Android applications using industry-leading frameworks like Swift and Kotlin.",
      course4:
        "Discover the fundamentals of graphic design, including typography, color theory, layout design, and image manipulation techniques. Create visually stunning designs for print and digital media.",
      course5:
        "Become proficient in front-end web development. Learn HTML, CSS, JavaScript, and popular frameworks like Bootstrap and React. Build interactive and responsive websites.",
      course6:
        "Take your JavaScript skills to the next level. Explore advanced concepts like closures, prototypes, asynchronous programming, and ES6 features. Build complex applications with confidence.",
    };

    await Course.create([
      {
        title: "Web Design Fundamentals",
        availability: "free",
        description: courseDescription.course1,
        author: user_1?._id,
        length: 4,
        difficulty: "beginner",
        previewImages: [
          "web-design-preview-01.png",
          "web-design-preview-02.png",
          "web-design-preview-03.png",
        ],
        contents: [
          {
            title: "Introduction to HTML",
            lessons: [],
          },
          {
            title: "Styling with CSS",
            lessons: [],
          },
          {
            title: "Introduction to Responsive Design",
            lessons: [],
          },
          {
            title: "Design Principles for Web",
            lessons: [],
          },
          {
            title: "Building a Basic Website",
            lessons: [],
          },
        ],
        mainImg: "course-01-cover.png",
      },
      {
        title: "UI/UX Design",
        availability: "paid",
        description: courseDescription.course2,
        author: user_2?._id,
        length: 6,
        difficulty: "intermediate",
        previewImages: [
          "ux-ui-preview-01.png",
          "ux-ui-preview-02.png",
          "ux-ui-preview-03.png",
        ],
        mainImg: "course-02-cover.png",
        released: true,
        mainVideo:
          "https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley",
        contents: [
          {
            title: "Introduction to UI/UX Design",
            lessons: [
              {
                title: "Understanding UI/UX Design Principles",
                videoUrl: "",
                length: 45,
              },
              {
                title: "Importance of User-Centered Design",
                videoUrl: "",
                length: 60,
              },
              {
                title: "The Role of UI/UX Design in Product Development",
                videoUrl: "",
                length: 60,
              },
            ],
          },
          {
            title: "User Research and Analysis",
            lessons: [
              {
                title: "Conducting User Research and Interviews",
                videoUrl: "",
                length: 60,
              },
              {
                title: "Analyzing User Needs and Behavior",
                videoUrl: "",
                length: 60,
              },
              {
                title: "Creating User Personas and Scenarios",
                videoUrl: "",
                length: 45,
              },
            ],
          },
          {
            title: "Wireframing and Prototyping",
            lessons: [
              {
                title: "Introduction to Wireframing Tools and Techniques",
                videoUrl: "",
                length: 60,
              },
              {
                title: "Creating Low-Fidelity Wireframes",
                videoUrl: "",
                length: 60,
              },
              {
                title: "Prototyping and Interactive Mockups",
                videoUrl: "",
                length: 60,
              },
            ],
          },
          {
            title: "Visual Design and Branding",
            lessons: [
              {
                title: "Color Theory and Typography in UI Design",
                videoUrl: "",
                length: 60,
              },
              {
                title: "Visual Hierarchy and Layout Design",
                videoUrl: "",
                length: 60,
              },
              {
                title: "Creating a Strong Brand Identity",
                videoUrl: "",
                length: 45,
              },
            ],
          },
          {
            title: "Usability Testing and Iteration",
            lessons: [
              {
                title: "Usability Testing Methods and Techniques",
                videoUrl: "",
                length: 60,
              },
              {
                title: "Analyzing Usability Test Results",
                videoUrl: "",
                length: 45,
              },
              {
                title: "Iterating and Improving UX Designs",
                videoUrl: "",
                length: 45,
              },
            ],
          },
        ],
      },
      {
        title: "Mobile App Development",
        availability: "free",
        description: courseDescription.course3,
        author: user_3?._id,
        length: 8,
        difficulty: "intermediate",
        previewImages: [
          "mobile-app-dev-preview-01.png",
          "mobile-app-dev-preview-02.png",
          "mobile-app-dev-preview-03.png",
        ],
        contents: [
          {
            title: "Introduction to Mobile App Development",
            lessons: [],
          },
          {
            title: "Fundamentals of Swift Programming (iOS)",
            lessons: [],
          },
          {
            title: "Fundamentals of Kotlin Programming (Android)",
            lessons: [],
          },
          {
            title: "Building User Interfaces",
            lessons: [],
          },
          {
            title: "App Deployment and Testing",
            lessons: [],
          },
        ],
        mainImg: "course-03-cover.png",
      },
      {
        title: "Graphic Design for Beginners",
        availability: "free",
        description: courseDescription.course4,
        author: user_4?._id,
        length: 10,
        difficulty: "beginner",
        previewImages: [
          "graphic-design-preview-01.png",
          "graphic-design-preview-02.png",
          "graphic-design-preview-03.png",
        ],
        contents: [
          {
            title: "Introduction to Graphic Design",
            lessons: [],
          },
          {
            title: "Typography and Color Theory",
            lessons: [],
          },
          {
            title: "Layout Design and Composition",
            lessons: [],
          },
          {
            title: "Image Editing and Manipulation",
            lessons: [],
          },
          {
            title: "Designing for Print and Digital Media",
            lessons: [],
          },
        ],
        mainImg: "course-04-cover.png",
      },
      {
        title: "Front-End Web Development",
        availability: "free",
        description: courseDescription.course5,
        author: user_5?._id,
        length: 10,
        difficulty: "advanced",
        previewImages: [
          "web-design-preview-01.png",
          "web-design-preview-02.png",
          "web-design-preview-02.png",
        ],
        contents: [
          {
            title: "HTML Fundamentals",
            lessons: [],
          },
          {
            title: "CSS Styling and Layouts",
            lessons: [],
          },
          {
            title: "JavaScript Basics",
            lessons: [],
          },
          {
            title: "Building Responsive Websites",
            lessons: [],
          },
          {
            title: "Introduction to Bootstrap and React",
            lessons: [],
          },
        ],
        mainImg: "course-05-cover.png",
      },
      {
        title: "Advanced JavaScript",
        availability: "paid",
        description: courseDescription.course6,
        author: user_5?._id,
        length: 6,
        difficulty: "advanced",
        previewImages: [],
        mainImg: "course-06-cover.png",
      },
    ]);

    const webDesignCourse = await Course.findOne({
      title: "Web Design Fundamentals",
    });

    const uiUxDesignCourse = await Course.findOne({
      title: "UI/UX Design",
    });

    const mobileAppDevelopmentCourse = await Course.findOne({
      title: "Mobile App Development",
    });

    const graphicDesignCourse = await Course.findOne({
      title: "Graphic Design for Beginners",
    });

    const frontEndWebDevelopmentCourse = await Course.findOne({
      title: "Front-End Web Development",
    });

    await Review.create([
      {
        authorId: user_3?._id,
        courseId: webDesignCourse?._id,
        content:
          "The web design course provided a solid foundation for me. The instructors were knowledgeable and supportive, and the interactive learning environment was engaging. I highly recommend it!",
      },

      {
        authorId: user_2?._id,
        courseId: uiUxDesignCourse?._id,
        content:
          "The UI/UX design course exceeded my expectations. The instructor's expertise and practical assignments helped me improve my design skills. I feel more confident in my career now. Thank you!",
      },

      {
        authorId: user_4?._id,
        courseId: mobileAppDevelopmentCourse?._id,
        content:
          "The mobile app development course was fantastic! The step-by-step tutorials and hands-on projects helped me grasp the concepts easily. I'm now building my own app. Great course!",
      },

      {
        authorId: user_5?._id,
        courseId: graphicDesignCourse?._id,
        content:
          "I enrolled in the graphic design course as a beginner, and it was the perfect starting point. The instructor's guidance and feedback improved my design abilities significantly. I'm grateful for this course!",
      },

      {
        authorId: user_6?._id,
        courseId: frontEndWebDevelopmentCourse?._id,
        content:
          "The front-end web development course was a game-changer for me. It covered essential concepts, from HTML to JavaScript, with clear explanations and real-world projects. I now feel confident working on front-end development. Highly recommended!",
      },
    ]);

    await About.create({
      title: "About Skillbridge",
      description:
        "Welcome to our platform, where we are passionate about empowering individuals to master the world of design and development. We offer a wide range of online courses designed to equip learners with the skills and knowledge needed to succeed in the ever-evolving digital landscape.",
      section: [
        {
          title: "Achievements",
          type: "achievement",
          description:
            "Our commitment to excellence has led us to achieve significant milestones along our journey. Here are some of our notable achievements",
          cards: [
            {
              title: "Trusted by Thousands",
              description:
                "We have successfully served thousands of students, helping them unlock their potential and achieve their career goals.",
              icon: "icon-ach-crown.svg",
            },
            {
              title: "Award-Winning Courses",
              description:
                "Our courses have received recognition and accolades in the industry for their quality, depth of content, and effective teaching methodologies.",
              icon: "icon-ach-medal.svg",
            },
            {
              title: "Positive Student Feedback",
              description:
                "We take pride in the positive feedback we receive from our students, who appreciate the practicality and relevance of our course materials.",
              icon: "icon-ach-theater-masks.svg",
            },
            {
              title: "Industry Partnerships",
              description:
                "We have established strong partnerships with industry leaders, enabling us to provide our students with access to the latest tools and technologies",
              icon: "icon-ach-shield.svg",
            },
          ],
        },
        {
          title: "Goals",
          type: "goal",
          description:
            "At SkillBridge, our goal is to empower individuals from all backgrounds to thrive in the world of design and development. We believe that education should be accessible and transformative, enabling learners to pursue their passions and make a meaningful impact.\n" +
            "Through our carefully crafted courses, we aim to",
          cards: [
            {
              title: "Provide Practical Skills",
              description:
                "We focus on delivering practical skills that are relevant to the current industry demands. Our courses are designed to equip learners with the knowledge and tools needed to excel in their chosen field.",
              icon: "icon-goal-backpack.svg",
            },
            {
              title: "Foster Creative Problem-Solving",
              description:
                "We encourage creative thinking and problem-solving abilities, allowing our students to tackle real-world challenges with confidence and innovation.",
              icon: "icon-goal-book.svg",
            },
            {
              title: "Promote Collaboration and Community",
              description:
                "We believe in the power of collaboration and peer learning. Our platform fosters a supportive and inclusive community where learners can connect, share insights, and grow together.",
              icon: "icon-goal-puzzle.svg",
            },
            {
              title: "Stay Ahead of the Curve",
              description:
                "The digital landscape is constantly evolving, and we strive to stay at the forefront of industry trends. We regularly update our course content to ensure our students receive the latest knowledge and skills.",
              icon: "icon-goal-alarm-light.svg",
            },
          ],
        },
      ],
    });

    await db.close();
  } catch (e) {
    console.log("=>(fixtures.ts:21) e", e);
  }
};

void run();

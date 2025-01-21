import mongoose from "mongoose";
import { Plan } from "./src/schemas/Plan";
import dotenv from "dotenv";
import { User } from "./src/schemas/User";
import { Course } from "./src/schemas/Course";
import { Review } from "./src/schemas/Review";
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

    const collections = ["plans", "users", "courses", "reviews"];

    for (const collectionName of collections) {
      await dropCollection(db, collectionName);
    }

    await User.create([
      {
        firstName: "Sarah",
        lastName: "Thompson",
        email: "sarah.thompson@test.com",
        password: "test",
      },
      {
        firstName: "Michael",
        lastName: "Adams",
        email: "michael.adams@test.com",
        password: "test",
      },
      {
        firstName: "Jennifer",
        lastName: "Wilson",
        email: "jennifer.wilson@test.com",
        password: "test",
      },
      {
        firstName: "David",
        lastName: "Brown",
        email: "david.brown@test.com",
        password: "test",
      },
      {
        firstName: "Emily",
        lastName: "Johnson",
        email: "emily.johnson@test.com",
        password: "test",
      },
      {
        firstName: "Christopher",
        lastName: "Taylor",
        email: "christopher.taylor@test.com",
        password: "test",
      },
      {
        firstName: "Jessica",
        lastName: "Martinez",
        email: "jessica.martinez@test.com",
        password: "test",
      },
      {
        firstName: "James",
        lastName: "Anderson",
        email: "james.anderson@test.com",
        password: "test",
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
      },
      {
        title: "UI/UX Design",
        availability: "paid",
        description: courseDescription.course2,
        author: user_2?._id,
        length: 6,
        difficulty: "intermediate",
        previewImages: [
          "ui-ux-preview-01.png",
          "ui-ux-preview-02.png",
          "ui-ux-preview-03.png",
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

    await db.close();
  } catch (e) {
    console.log("=>(fixtures.ts:21) e", e);
  }
};

void run();

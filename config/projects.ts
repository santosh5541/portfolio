import { Maybe, Tuple } from '../types';
import { Stack } from './stack';

export interface SubProject {
  title: string;
  description: string;
  repository: Maybe<string>;
}
export const defaultDimensions: Tuple<number> = [450, 220];

export interface Project {
  title: string;
  slug: string;
  banner: string;
  description: string;
  shortDescription?: string;
  repository: Maybe<string>;
  stack: Stack[];
  subProjects: SubProject[];
}

export const projects: Project[] = [
  {
    title: 'MRI DETECTION SYSTEM',
    slug: 'MRI',
    banner: '/static/projects/mri/banner.png',
    description:
      'This project implements an end‑to‑end MRI tumor detection pipeline using transfer learning with the VGG16 convolutional backbone. Starting from raw scan images, it resizes and normalizes each slice, applies on‑the‑fly augmentations to enrich the training set, and then feeds them into a custom classifier head built atop the frozen VGG16 feature extractor (with the last few convolutional layers fine‑tuned for MRI texture). The model is compiled with an Adam optimizer and trained over multiple epochs using a data generator to manage memory, after which it’s evaluated on held‑out scans. Finally, a utility function loads new MRI images, runs inference to predict “Tumor: <type>” or “No Tumor,” and displays each scan with its confidence score—providing a streamlined tool for rapid, automated tumor screening.',
    // shortDescription:
    //   'Ready to deploy, distributed cryptocurrency trading bot.',
    repository: 'https://github.com/santosh5541/MRISYSTEM',
    stack: [
      Stack.python,
      Stack.flask,
      Stack.tensorflow,
      Stack.numpy,
      Stack.pillow,
      Stack.jinja2,
      Stack.html,
      Stack.css,
      Stack.jupyter,
    ],
    subProjects: [],
  },
  {
    title: 'HVAC SYSTEM',
    slug: 'HVAC System',
    banner: '/static/projects/hvac/banner.png',
    description: `I developed a reinforcement-learning-based HVAC control system that learns optimal temperature-setpoint policies by interacting with a simulated building environment. I started by implementing a physics-informed thermal model and a rule-based controller, then I trained DQN, DDQN, SAC, and PPO agents using OpenAI Gym and Stable-Baselines3. I tuned hyperparameters through random search, grid search, and Bayesian optimization to maximize energy savings while ensuring indoor temperatures stayed within comfort bounds. In my experiments, the PPO agent (with grid-search tuning) performed best—achieving about 41.5 kWh of energy savings, keeping temperature deviations under 3.6 °C, and reducing HVAC costs by roughly $4,150 over the testing period. To prevent overfitting, I incorporated dropout, L2 weight decay, and early stopping, and my comparative analysis across algorithms highlights how careful reward design and parameter selection drive both efficiency and comfort in smart-building control.`, // shortDescription:
    //   'Peapods is a new type of decentralized social network that values real human interaction.',
    repository: 'https://github.com/amalsha27/RL-Project',
    stack: [
      Stack.python,
      Stack.jupyter,
      Stack.tensorflow,
      Stack.numpy,
      Stack.pandas,
    ],
    subProjects: [],
  },
  {
    title: 'Movie Recommendation System',
    slug: 'MRS',
    banner: '/static/projects/mrc/mrc.png',
    description:
      'I built a content‑based movie recommendation engine in Python using the TMDB 5000 Movies and Credits datasets. I first merged each film’s metadata with its cast and crew details in pandas, then combined key textual features (overview, genres, keywords, cast, crew) into a unified “tags” field. After lowercasing and stemming with NLTK’s PorterStemmer, I vectorized those tags using scikit‑learn’s CountVectorizer (capped at 5,000 terms) and computed a cosine‑similarity matrix over the resulting feature vectors. I wrapped the core recommend(movie_title) function— which looks up a movie’s index, sorts its similarity scores, and returns the top five matches—inside a Streamlit app. In the UI, users can type or select a title, click “Recommend,” and instantly see poster images, titles, and overviews of their five most similar films',
    repository: 'https://github.com/santosh5541/movierecommendation',
    stack: [
      Stack.python,
      Stack.pandas,
      Stack.numpy,
      Stack.nltk,
      Stack.scikit_learn,
      Stack.streamlit,
    ],
    subProjects: [],
  },
  {
    title: 'Power Plant System',
    slug: 'Power Plant',
    banner: '/static/projects/powerplant/pps.png',
    description: `The core motive behind this Power‑Plant project is to give teams a simple, self‑contained microservice for managing and querying battery asset data. By exposing a RESTful API backed by MongoDB, it lets you:

    Ingest new battery records (name, capacity, size, location, etc.)

    Query those records by postcode range, so you can quickly see which batteries serve which regions

    Integrate effortlessly with dashboards or automation pipelines via a well‑documented Swagger UI

In short, it was built to centralize your battery data into one lightweight service—making it easy to onboard new data sources, explore stored records, and drive energy‑management decisions without wrestling with low‑level database or deployment details.`,
    repository: 'https://github.com/santosh5541/Power-Plant',
    stack: [Stack.java, Stack.sql, Stack.mongo, Stack.Restapi],
    subProjects: [],
  },
  {
    title: 'Inventory Management System',
    slug: 'IMS',
    repository: 'https://github.com/santosh5541/imsfinal',
    banner: '/static/projects/ims/ims.png',
    description:
      'This project is an “Inventory Management System” backend built with Spring Boot (parent 2.7.1) under the group com.inventory and artifact inventory-backend, designed to centralize product and stock control in a MySQL database via Spring Data JPA. It exposes RESTful endpoints (via spring‑boot‑starter‑web) that validate input with Hibernate Validator, map between DTOs and entities using ModelMapper, and secure access through Spring Security with JWT tokens. For operational workflows it integrates Razorpay’s Java SDK for payment processing, allows CSV import/export of inventory data via OpenCSV, and leverages Lombok to reduce boilerplate. A comprehensive test suite is included with spring‑boot‑starter‑test, making IMSFinal a production‑ready microservice for robust, secure inventory tracking and transaction handling.',
    stack: [Stack.java, Stack.sql, Stack.Restapi, Stack.react],
    subProjects: [
      // {
      //   title: 'Staff Management',
      //   repository: null,
      //   description:
      //     'Staff app for stewards restaurant staff, easily update menu, product availability and take live orders from customers.',
      // },
      // {
      //   title: 'Admin Dashboard',
      //   repository: null,
      //   description:
      //     'Staff administration app for stewards restaurant partners. This helps restaurant administrators to easily manage orders, receipts, tables, restaurant info etc.',
      // },
      // {
      //   title: 'Self Checkout',
      //   repository: null,
      //   description:
      //     "Stewards self checkout solution for customers who don't like waiting. Available on demand for iPad and tablets.",
      // },
    ],
  },
  {
    title: 'Wallet Transaction System',
    slug: 'WTS',
    banner: '/static/projects/wts/wts.png',
    description:
      'This transaction_project is a Maven‑managed Java application that implements a wallet‑transaction system. It centralizes all wallet operations—deposits, withdrawals and peer‑to‑peer transfers—behind a clean programmatic API, validating each request, atomically updating user balances and logging every action for full auditability. By relying on a Maven wrapper and pom.xml, it ensures consistent builds and dependency management, making it easy to integrate into larger financial‑services pipelines and client applications',
    repository: 'https://github.com/santosh5541/transaction_project',
    stack: [Stack.java, Stack.sql, Stack.react, Stack.kafka, Stack.redis],
    subProjects: [],
  },
  {
    title: 'Student Management System',
    slug: 'SMS',
    banner: '/static/projects/sms/sms.png',
    description:
      'I developed a microservices‑based student management system to showcase how to build a scalable, loosely coupled backend for handling student data. I split core functionality into individual Spring Boot services—such as the microservices-student service for CRUD operations—registered them with a Eureka service registry (serviceregistry), and fronted all API calls through a Spring Cloud Gateway (cloudgateway). On top of that, I built an Angular SPA (crud-angular) to provide an interactive UI for creating, updating, and viewing student records. This architecture demonstrates best practices in service discovery, API routing, and separation of concerns, making it easy to extend with new microservices (e.g., course management or authentication) without touching existing components',
    repository: 'https://github.com/santosh5541/microservice_f1',
    stack: [Stack.java, Stack.typescript, Stack.sql, Stack.microservices],
    subProjects: [],
  },
  {
    title: 'Todo Application',
    slug: 'Todo',
    banner: '/static/projects/todo/todo.png',
    description:
      'I built a single‑page to‑do list application using Angular 16.0.2, scaffolded with the Angular CLI. It demonstrates core Angular concepts—components for rendering task items, services for managing state, two‑way data binding and reactive forms for creating and editing tasks, and routing for navigation—all written in TypeScript and styled with HTML/CSS. The CLI setup also includes a live development server with hot‑reload, unit testing via Karma, and end‑to‑end testing scaffolds via Protractor, making it a full‑featured starter project for task management and modern front‑end workflows',
    // shortDescription:
    //   'Ready to deploy, distributed cryptocurrency trading bot.',
    repository: 'https://github.com/santosh5541/todo',
    stack: [Stack.typescript, Stack.html, Stack.css],
    subProjects: [],
  },
];

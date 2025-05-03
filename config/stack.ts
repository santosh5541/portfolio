import { Colors } from './colors';

export enum Stack {
  // Languages
  go,
  typescript,
  javascript,
  python,
  java,
  php,

  // Frontend
  react,
  reactnative,

  // Backend
  graphql,
  node,
  django,
  flask, // ← added
  Restapi,

  // Templating
  jinja2, // ← added

  // Data Processing
  numpy,
  pillow,
  pandas, // ← added
  nltk, // ← added
  scikit_learn, // ← added

  // Frontend markup
  html,
  css,

  // Notebooks
  jupyter,
  streamlit, // ← added

  // Cloud
  aws,
  gcp,

  // Messaging
  nats,
  kafka,
  rabbitmq,
  microservices,
  // Databases

  arangodb,
  redis,
  postgres,
  mongo,
  sql,

  // DevOps / Tools
  docker,
  kubernetes,
  terraform,
  jenkins,

  // OS
  linux,

  // Machine Learning
  tensorflow,
}

export const WorkStack: Stack[] = [
  // Languages
  Stack.go,
  Stack.typescript,
  Stack.javascript,
  Stack.python,
  Stack.java,
  Stack.php,

  // Frontend
  Stack.react,
  // Stack.reactnative,

  // Backend
  Stack.graphql,
  Stack.node,
  Stack.django,
  Stack.flask, // ← added

  // Templating
  Stack.jinja2, // ← added

  // Data Processing
  Stack.numpy,
  Stack.pillow,
  Stack.pandas, // ← added
  Stack.nltk, // ← added
  Stack.scikit_learn, // ← added

  // Frontend markup
  Stack.html,
  Stack.css,

  // Notebooks
  Stack.jupyter,
  Stack.streamlit, // ← added

  // Cloud
  Stack.aws,
  Stack.gcp,

  // Messaging
  Stack.nats,
  Stack.kafka,
  Stack.rabbitmq,

  // Databases
  Stack.postgres,
  Stack.mongo,
  Stack.arangodb,
  Stack.redis,
  Stack.sql,

  // DevOps / Tools
  Stack.docker,
  Stack.kubernetes,
  Stack.terraform,
  Stack.jenkins,

  // OS
  Stack.linux,

  // Machine Learning
  Stack.tensorflow,
];

type StackInfoMap = {
  value: string;
  color: string;
};

export const StackInfo: Record<Stack, StackInfoMap> = {
  // Languages
  [Stack.go]: { value: 'Go', color: Colors.go },
  [Stack.typescript]: { value: 'TypeScript', color: Colors.typescript },
  [Stack.javascript]: { value: 'JavaScript', color: Colors.javascript },
  [Stack.python]: { value: 'Python', color: Colors.python },
  [Stack.java]: { value: 'Java', color: Colors.java },
  [Stack.php]: { value: 'PHP', color: Colors.php },

  // Frontend
  [Stack.react]: { value: 'React', color: Colors.react },
  [Stack.reactnative]: { value: 'React Native', color: Colors.reactnative },

  // Backend
  [Stack.graphql]: { value: 'GraphQL', color: Colors.graphql },
  [Stack.node]: { value: 'Node.js', color: Colors.node },
  [Stack.django]: { value: 'Django', color: Colors.django },
  [Stack.flask]: { value: 'Flask', color: Colors.flask },
  [Stack.Restapi]: { value: 'RestApi', color: Colors.Restapi }, // ← added

  // Templating
  [Stack.jinja2]: { value: 'Jinja2', color: Colors.jinja2 }, // ← added

  // Data Processing
  [Stack.numpy]: { value: 'NumPy', color: Colors.numpy },
  [Stack.pillow]: { value: 'Pillow', color: Colors.pillow },
  [Stack.pandas]: { value: 'Pandas', color: Colors.pandas }, // ← added
  [Stack.nltk]: { value: 'NLTK', color: Colors.nltk }, // ← added
  [Stack.scikit_learn]: { value: 'Scikit‑Learn', color: Colors.scikit_learn }, // ← added

  // Frontend markup
  [Stack.html]: { value: 'HTML5', color: Colors.html },
  [Stack.css]: { value: 'CSS3', color: Colors.css },

  // Notebooks
  [Stack.jupyter]: { value: 'Jupyter', color: Colors.jupyter },
  [Stack.streamlit]: { value: 'Streamlit', color: Colors.streamlit }, // ← added

  // Cloud
  [Stack.aws]: { value: 'AWS', color: Colors.aws },
  [Stack.gcp]: { value: 'Google Cloud', color: Colors.gcp },

  // Messaging
  [Stack.nats]: { value: 'NATS', color: Colors.nats },
  [Stack.kafka]: { value: 'Kafka', color: Colors.kafka },
  [Stack.rabbitmq]: { value: 'RabbitMQ', color: Colors.rabbitmq },
  [Stack.microservices]: {
    value: 'Microservices',
    color: Colors.microservices,
  },

  // Databases
  [Stack.postgres]: { value: 'Postgres', color: Colors.postgres },
  [Stack.mongo]: { value: 'MongoDB', color: Colors.mongo },
  [Stack.arangodb]: { value: 'ArangoDB', color: Colors.arangodb },
  [Stack.redis]: { value: 'Redis', color: Colors.redis },
  [Stack.sql]: { value: 'SQL', color: Colors.sql },

  // DevOps / Tools
  [Stack.docker]: { value: 'Docker', color: Colors.docker },
  [Stack.kubernetes]: { value: 'Kubernetes', color: Colors.kubernetes },
  [Stack.terraform]: { value: 'Terraform', color: Colors.terraform },
  [Stack.jenkins]: { value: 'Jenkins', color: Colors.jenkins },

  // OS
  [Stack.linux]: { value: 'Linux', color: Colors.linux },

  // Machine Learning
  [Stack.tensorflow]: { value: 'TensorFlow', color: Colors.tensorflow },
};

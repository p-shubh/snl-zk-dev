export const gameContent = [
  {
    id: 1,
    term: "Artificial Intelligence",
    definition:
      "Artificial Intelligence (AI) is a cutting-edge field of computer science that involves the development of intelligent machines capable of performing tasks that typically require human intelligence. These tasks include learning, reasoning, problem-solving, perception, and natural language understanding. AI systems aim to simulate human cognitive functions, allowing machines to adapt, learn from experience, and improve over time.",
  },
  {
    id: 2,
    term: "Machine Learning",
    definition:
      "Machine Learning (ML) is a subset of AI that focuses on providing systems the ability to learn and improve from experience without being explicitly programmed. ML algorithms use statistical techniques to enable computers to identify patterns and make decisions based on data. The learning process involves the algorithm iteratively learning from data, making predictions, and refining its model to improve accuracy and performance.",
  },
  {
    id: 3,
    term: "Neural Network",
    definition:
      "A Neural Network is a computational model inspired by the human brain's structure and function. It consists of interconnected nodes (artificial neurons) organized in layers. Neural networks are designed to recognize patterns and features in data, making them particularly effective in tasks like image and speech recognition. Deep learning, a subset of machine learning, often involves neural networks with multiple layers (deep neural networks).",
    question: "What is the term for a field of computer science that involves the development of intelligent machines capable of tasks requiring human intelligence?",
    options: [
      "Machine Learning",
      "Neural Network",
      "Artificial Intelligence",
      "Deep Learning"
    ],
    answer: "Artificial Intelligence"
  },
  {
    id: 4,
    term: "Deep Learning",
    definition:
      "Deep Learning is a specialized area of machine learning where artificial neural networks with multiple layers (deep neural networks) are used to model and solve complex problems. Deep learning algorithms automatically learn hierarchical representations of data, allowing them to extract intricate features and patterns. This approach has demonstrated remarkable success in various applications, including image and speech recognition.",
  },
  {
    id: 5,
    term: "Supervised Learning",
    definition:
      "Supervised Learning is a type of machine learning where the algorithm is trained on a labeled dataset. In supervised learning, the algorithm learns the mapping between inputs and corresponding outputs by using a set of example pairs. The goal is to generalize from the training data to make accurate predictions or classifications on new, unseen data.",
  },
  {
    id: 6,
    term: "Unsupervised Learning",
    definition:
      "Unsupervised Learning is a type of machine learning where the algorithm is not provided with labeled data. Instead, the algorithm must find patterns and relationships in the data on its own. Common tasks in unsupervised learning include clustering, where the algorithm groups similar data points, and dimensionality reduction, which aims to simplify data while retaining essential information.",
  },
  {
    id: 7,
    term: "Reinforcement Learning",
    definition:
      "Reinforcement Learning is a type of machine learning where an agent learns how to behave in an environment by performing actions and receiving rewards or penalties. The agent explores the environment and learns optimal strategies to maximize cumulative rewards. Reinforcement learning is often used in scenarios such as game playing, robotic control, and autonomous decision-making systems.",
  },
  {
    id: 8,
    term: "Algorithm",
    definition:
      "An Algorithm is a step-by-step procedure or set of rules for solving a specific problem or accomplishing a particular task. Algorithms can be expressed in various forms, including natural language, flowcharts, or computer code. They are fundamental to computer science and are used in various applications, from sorting data to optimizing complex processes.",
    question: "Which subset of AI focuses on providing systems the ability to learn and improve from experience without being explicitly programmed?",
    options: [
      "Machine Learning",
      "Supervised Learning",
      "Unsupervised Learning",
      "Deep Learning"
    ],
    answer: "Machine Learning"
  },
  {
    id: 9,
    term: "Data Science",
    definition:
      "Data Science is a multidisciplinary field that employs scientific methods, processes, algorithms, and systems to extract knowledge and insights from structured and unstructured data. Data scientists use a combination of statistical analysis, machine learning, and domain expertise to uncover patterns, make predictions, and inform decision-making processes.",
  },
  {
    id: 10,
    term: "Big Data",
    definition:
      "Big Data refers to extremely large and complex datasets that go beyond the capabilities of traditional data processing tools. These datasets are characterized by the three Vs: volume, velocity, and variety. Big Data technologies and techniques are employed to store, process, and analyze massive amounts of information, uncovering valuable insights and patterns.",
    question: "In which type of learning is the algorithm trained on a labeled dataset?",
    options: [
      "Reinforcement Learning",
      "Unsupervised Learning",
      "Supervised Learning",
      "Deep Learning"
    ],
    answer: "Supervised Learning"
  },
  {
    id: 11,
    term: "Data Mining",
    definition:
      "Data Mining is the process of discovering patterns and knowledge from large amounts of data. It involves applying techniques from machine learning, statistics, and database systems to extract meaningful insights. Data mining is commonly used to identify trends, anomalies, and relationships within datasets for decision-making purposes.",
  },
  {
    id: 12,
    term: "Feature Engineering",
    definition:
      "Feature Engineering is the process of selecting and transforming variables (features) in a dataset to improve the performance of a machine learning model. Skilled feature engineering can enhance a model's ability to capture relevant information and relationships within the data, leading to improved predictive accuracy.",
  },
  {
    id: 13,
    term: "Bias in AI",
    definition:
      "Bias in AI refers to unintended and often unfair discrimination present in the results of an AI system. This bias can arise from biased training data, biased algorithms, or both. Addressing bias in AI is crucial to ensure fair and equitable outcomes, and researchers strive to develop methods for detecting and mitigating bias in AI systems.",
    question: "What is a computational model inspired by the human brain's structure and function?",
    options: [
      "Deep Learning",
      "Artificial Intelligence",
      "Neural Network",
      "Machine Learning"
    ],
    answer: "Neural Network"
  },
  {
    id: 14,
    term: "Explainable AI (XAI)",
    definition:
      "Explainable AI (XAI) is an approach to artificial intelligence that emphasizes making the outputs of AI systems understandable and interpretable, especially for humans. XAI aims to provide insights into how AI models reach specific decisions, fostering transparency and trust in AI applications.",
  },
  {
    id: 15,
    term: "Computer Vision",
    definition:
      "Computer Vision is a field of study that enables computers to interpret and make decisions based on visual data, such as images or videos. Computer vision algorithms aim to replicate human vision capabilities, allowing machines to recognize objects, scenes, and patterns in visual information.",
  },
  {
    id: 16,
    term: "Natural Language Processing (NLP)",
    definition:
      "Natural Language Processing (NLP) is a field of AI that enables computers to understand, interpret, and generate human language in a way that is both valuable and meaningful. NLP algorithms are used in applications such as language translation, sentiment analysis, and chatbots to facilitate communication between humans and machines.",
  },
  {
    id: 17,
    term: "Chatbot",
    definition:
      "A Chatbot is a computer program designed to simulate conversation with human users, especially over the internet. Chatbots use natural language processing and machine learning to understand and respond to user inputs, providing information, answering queries, and facilitating interactive experiences.",
  },
  {
    id: 18,
    term: "IoT (Internet of Things)",
    definition:
      "The Internet of Things (IoT) refers to the network of physical devices, vehicles, home appliances, and other objects embedded with sensors, software, and network connectivity. These connected devices collect and exchange data, enabling seamless communication and automation. IoT has applications in smart homes, healthcare, transportation, and more.",
  },
  {
    id: 19,
    term: "Blockchain",
    definition:
      "Blockchain is a decentralized, distributed ledger technology that records transactions across many computers in a secure and transparent manner. Each block in the chain contains a timestamped list of transactions, and once added, it cannot be altered retroactively without consensus from the network. Blockchain is the underlying technology for various cryptocurrencies like Bitcoin.",
    question: "What type of machine learning involves the algorithm not being provided with labeled data?",
    options: [
      "Reinforcement Learning",
      "Supervised Learning",
      "Unsupervised Learning",
      "Deep Learning"
    ],
    answer: "Unsupervised Learning"
  },
  {
    id: 20,
    term: "Augmented Reality (AR)",
    definition:
      "Augmented Reality (AR) is a technology that superimposes computer-generated information, such as text, images, or animations, onto the user's view of the real world. AR enhances the user's perception of the environment by overlaying digital content, often through devices like smartphones or AR glasses.",
  },
  {
    id: 21,
    term: "Virtual Reality (VR)",
    definition:
      "Virtual Reality (VR) is a computer-generated simulation of a three-dimensional environment that can be interacted with in a seemingly real or physical way by a person using special electronic equipment, such as a helmet with a screen inside or gloves fitted with sensors. VR provides immersive experiences across various domains, including gaming, education, and training.",
  },
  {
    id: 22,
    term: "Edge Computing",
    definition:
      "Edge Computing is a distributed computing paradigm that brings computation and data storage closer to the location where it is needed. This approach improves response times and saves bandwidth by processing data at the edge of the network rather than relying on a centralized cloud server. Edge computing is particularly valuable in applications requiring low latency and real-time processing.",
  },
  {
    id: 23,
    term: "Cloud Computing",
    definition:
      "Cloud Computing is the delivery of computing services, including servers, storage, databases, networking, analytics, software, and intelligence, over the internet. Cloud computing offers advantages such as faster innovation, flexible resources, and economies of scale. Users can access and utilize these services on-demand without the need for extensive infrastructure.",
  },
  {
    id: 24,
    term: "Cybersecurity",
    definition:
      "Cybersecurity is the practice of protecting systems, networks, and programs from digital attacks, theft, and damage. Cybersecurity measures include the implementation of security protocols, encryption, firewalls, and threat detection systems to safeguard digital assets and sensitive information.",
    question: "What technology superimposes computer-generated information onto the user's view of the real world?",
    options: [
      "Augmented Reality",
      "Virtual Reality",
      "Computer Vision",
      "Machine Learning"
    ],
    answer: "Augmented Reality"
  },
  {
    id: 25,
    term: "Encryption",
    definition:
      "Encryption is the process of converting information or data into a code to prevent unauthorized access or disclosure. In the context of cybersecurity, encryption is used to secure communications, protect sensitive data, and ensure confidentiality. Advanced encryption algorithms play a crucial role in securing digital information.",
  },
  {
    id: 26,
    term: "API (Application Programming Interface)",
    definition:
      "An Application Programming Interface (API) is a set of rules and tools for building software applications. APIs specify how different software components should interact, allowing them to communicate and share data. APIs enable developers to integrate third-party services, access functionalities, and create interoperable software systems.",
  },
  {
    id: 27,
    term: "Open Source",
    definition:
      "Open Source refers to a type of software whose source code is available for modification or enhancement by anyone. Open source projects encourage collaboration, transparency, and community-driven development. Popular examples of open source software include the Linux operating system and the Apache web server.",
    question: "In which type of learning does an agent learn how to behave in an environment by performing actions and receiving rewards or penalties?",
    options: [
      "Supervised Learning",
      "Reinforcement Learning",
      "Unsupervised Learning",
      "Deep Learning"
    ],
    answer: "Reinforcement Learning"
  },
  {
    id: 28,
    term: "DevOps",
    definition:
      "DevOps is a set of practices that combines software development (Dev) and IT operations (Ops). The goal of DevOps is to shorten the development lifecycle and deliver high-quality software continuously. DevOps practices emphasize collaboration, automation, and a culture of shared responsibility among development and operations teams.",
  },
  {
    id: 29,
    term: "Agile",
    definition:
      "Agile is a project management and product development approach that prioritizes flexibility and customer satisfaction through iterative and incremental work. Agile methodologies, such as Scrum and Kanban, embrace changing requirements, continuous feedback, and adaptive planning to deliver value to customers in a more responsive and efficient manner.",
  },
  {
    id: 30,
    term: "Scrum",
    definition:
      "Scrum is an agile framework for managing knowledge work, with an emphasis on software development. In Scrum, work is organized in fixed-length iterations called sprints, typically lasting two to four weeks. Scrum promotes collaboration, transparency, and regular reflection to improve team performance.",
  },
  {
    id: 31,
    term: "Algorithmic Trading",
    definition:
      "Algorithmic Trading involves the use of algorithms and computer programs to trade financial securities automatically based on predefined criteria. These algorithms analyze market data, execute trades, and manage portfolios at speeds and frequencies beyond human capabilities. Algorithmic trading is prevalent in financial markets, contributing to liquidity and market efficiency.",
    question: "What is a step-by-step procedure or set of rules for solving a specific problem or accomplishing a particular task?",
    options: [
      "Algorithm",
      "Neural Network",
      "Machine Learning",
      "Artificial Intelligence"
    ],
    answer: "Algorithm"  
    },
  {
    id: 32,
    term: "Fintech",
    definition:
      "Fintech, short for Financial Technology, is a term used to describe innovative financial technologies. Fintech encompasses a wide range of applications, including mobile banking, investing, crowdfunding, and cryptocurrency. Fintech solutions leverage technology to enhance and streamline various financial services, disrupting traditional banking models.",
  },
  {
    id: 33,
    term: "Cryptocurrency",
    definition:
      "Cryptocurrency is a type of digital or virtual currency that relies on cryptography for security. Operating on decentralized networks built using blockchain technology, cryptocurrencies facilitate secure, transparent, and peer-to-peer transactions. Bitcoin, created in 2009, was the first decentralized cryptocurrency, and since then, numerous other cryptocurrencies, including Ethereum, Ripple, and Litecoin, have emerged.",
    question: "What multidisciplinary field employs scientific methods, processes, algorithms, and systems to extract knowledge from structured and unstructured data?",
    options: [
      "Data Science",
      "Machine Learning",
      "Big Data",
      "Artificial Intelligence"
    ],
    answer: "Data Science" 
  },
  {
    id: 34,
    term: "Smart Contract",
    definition:
      "A smart contract is a self-executing contract with the terms of the agreement directly written into code. These contracts run on blockchain platforms and automatically execute predefined actions when specific conditions are met. Smart contracts eliminate the need for intermediaries, ensuring transparency and trust in various transactions, including those involving cryptocurrencies.",
  },
  {
    id: 35,
    term: "Quantum Computing",
    definition:
      "Quantum computing leverages the principles of quantum mechanics to process information in ways fundamentally different from classical computers. Unlike classical bits, quantum bits or qubits can exist in multiple states simultaneously, enabling quantum computers to perform complex calculations at exponentially faster rates. Quantum computing holds promise for solving problems in cryptography, optimization, and scientific simulations that are currently intractable for classical computers.",
  },
  {
    id: 36,
    term: "Robotics",
    definition:
      "Robotics is a multidisciplinary field that involves the design, construction, operation, and use of robots. Robots are programmable machines capable of performing tasks autonomously or semi-autonomously. They find applications in various industries, including manufacturing, healthcare, exploration, and entertainment. Robotics combines elements of mechanical engineering, electronics, computer science, and artificial intelligence to create intelligent and adaptive machines.",
    question: "Which term refers to extremely large and complex datasets that go beyond the capabilities of traditional data processing tools?",
    options: [
      "Big Data",
      "Data Mining",
      "Machine Learning",
      "Data Science"
    ],
    answer: "Big Data"
  },
  {
    id: 37,
    term: "Automation",
    definition:
      "Automation involves the use of largely automatic equipment or systems to perform tasks without direct human intervention. The goal of automation is to enhance efficiency, accuracy, and productivity by delegating repetitive or hazardous tasks to machines. Industries ranging from manufacturing and logistics to finance and healthcare leverage automation to streamline processes and improve overall performance.",
    question: "What is the process of discovering patterns and knowledge from large amounts of data?",
    options: [
      "Data Mining",
      "Feature Engineering",
      "Machine Learning",
      "Big Data"
    ],
    answer: "Data Mining"
  },
  {
    id: 38,
    term: "Internet Security",
    definition:
      "Internet security, also known as cybersecurity, encompasses practices and technologies designed to protect computer systems, networks, and data from digital threats. These threats may include unauthorized access, data breaches, malware, and other forms of cyberattacks. Internet security measures often include the use of firewalls, antivirus software, encryption, and regular security audits to safeguard against evolving cyber threats.",
  },
  {
    id: 39,
    term: "Quantum Cryptography",
    definition:
      "Quantum cryptography is a method of securing communication using the principles of quantum mechanics. Unlike classical cryptographic methods, quantum cryptography leverages the properties of quantum particles to ensure secure communication channels. It offers a high level of security, as any attempt to eavesdrop on the quantum communication would disturb the quantum state, alerting the parties involved.",
  },
  {
    id: 40,
    term: "Distributed Ledger",
    definition:
      "A distributed ledger is a consensus of replicated, shared, and synchronized digital data spread across multiple sites, countries, or institutions. One of the most well-known implementations of distributed ledger technology is blockchain. Distributed ledgers provide a decentralized and tamper-resistant record of transactions, enhancing transparency and trust in various applications, including cryptocurrencies and supply chain management.",
    question: "What is the process of selecting and transforming variables in a dataset to improve the performance of a machine learning model?",
    options: [
      "Feature Engineering",
      "Data Science",
      "Data Mining",
      "Machine Learning"
    ],
    answer: "Feature Engineering"
  
  },
  {
    id: 41,
    term: "Edge AI",
    definition:
      "Edge AI involves deploying artificial intelligence algorithms or models directly on edge devices, such as IoT devices or edge servers, rather than relying on a centralized cloud server. Edge AI reduces latency by processing data locally, making it suitable for applications that require real-time decision-making. This approach is particularly beneficial in scenarios where bandwidth is limited or privacy concerns dictate local processing of sensitive data.",
  },
  {
    id: 42,
    term: "Exascale Computing",
    definition:
      "Exascale computing refers to a level of computing performance that can handle one exaflop, equivalent to a billion billion calculations, per second. This high-performance computing capability is crucial for solving complex problems in science, engineering, climate modeling, and other fields. Exascale computers have the potential to significantly advance our ability to simulate and understand intricate systems and phenomena.",
  },
  {
    id: 43,
    term: "Exponential Technologies",
    definition:
      "Exponential technologies are those that grow and advance at an exponential rate, often leading to rapid and transformative changes in various industries. These technologies include artificial intelligence, biotechnology, nanotechnology, and quantum computing, among others. The exponential growth of these technologies has the potential to revolutionize industries, drive innovation, and reshape the way we live and work.",
    question: "What does 'Bias in AI' refer to?",
    options: [
      "Unintended and often unfair discrimination",
      "Fair and equitable outcomes",
      "Transparent AI",
      "Efficient AI"
    ],
    answer: "Unintended and often unfair discrimination"
  },
  {
    id: 44,
    term: "Human Augmentation",
    definition:
      "Human augmentation involves using technology to enhance the capabilities of the human body. This often includes integrating electronic or mechanical components to improve physical, cognitive, or sensory abilities. Human augmentation technologies range from wearable devices, such as smart glasses and exoskeletons, to more advanced interventions like brain-computer interfaces. The goal is to enhance human performance and address limitations.",
  },
  {
    id: 45,
    term: "Explainable AI (XAI)",
    definition:
      "Explainable AI (XAI) is an approach to artificial intelligence that focuses on making the outputs of AI systems understandable and interpretable, especially for humans. XAI addresses the 'black box' nature of some AI algorithms, providing insights into how decisions are made. This transparency is crucial for building trust in AI applications, ensuring accountability, and identifying potential biases.",
  },
  {
    id: 46,
    term: "Generative Adversarial Network (GAN)",
    definition:
      "A Generative Adversarial Network (GAN) is a class of machine learning frameworks where two neural networks, the generator and the discriminator, are trained together to produce realistic outputs. GANs are widely used for generating synthetic data, creating deepfakes, and various creative applications. The generator and discriminator engage in a continual adversarial process, leading to the generation of increasingly realistic content.",
  },
  {
    id: 47,
    term: "Robotic Process Automation (RPA)",
    definition:
      "Robotic Process Automation (RPA) involves the use of software robots or 'bots' to automate highly repetitive and routine tasks normally performed by humans interacting with digital systems. RPA aims to streamline business processes, improve efficiency, and reduce errors. These software robots mimic human actions, interacting with digital interfaces to perform tasks like data entry, data extraction, and process automation.",
  },
  {
    id: 48,
    term: "Synthetic Data",
    definition:
      "Synthetic data refers to artificially generated data that mimics real-world data but does not contain personally identifiable information. This type of data is often used for testing and training machine learning models. Synthetic data allows developers and data scientists to create diverse scenarios, ensuring robust model training without compromising privacy or relying solely on limited real-world datasets.",
  },
  {
    id: 49,
    term: "Biometrics",
    definition:
      "Biometrics involves the measurement and statistical analysis of people's unique physical and behavioral characteristics. Biometric data, such as fingerprints, iris patterns, or facial features, is used for identification and access control. Biometric authentication provides a secure and convenient way to verify an individual's identity, and it is commonly employed in security systems, mobile devices, and border control.",
  },
  {
    id: 50,
    term: "Human-Computer Interaction (HCI)",
    definition:
      "Human-Computer Interaction (HCI) focuses on the design and use of computer systems, emphasizing the user's experience and interaction with the system. HCI combines principles from computer science, psychology, and design to create interfaces that are intuitive, efficient, and user-friendly. This field plays a crucial role in developing software, websites, and interactive systems that cater to the diverse needs and preferences of users.",
    question: "What does 'Explainable AI (XAI)' emphasize?",
    options: [
      "Complex algorithms",
      "Making AI outputs understandable and interpretable",
      "Speed of AI computations",
      "AI automation"
    ],
    answer: "Making AI outputs understandable and interpretable"
  },
  {
    id: 51,
    term: "Neuromorphic Computing",
    definition:
      "Neuromorphic computing is a type of computing architecture that simulates the structure and function of the human brain. By mimicking the neural networks in the brain, neuromorphic systems aim to achieve more efficient and intelligent computing. These systems process information in a manner similar to the brain's parallel processing, enabling them to excel in tasks such as pattern recognition and cognitive computing.",
  },
  {
    id: 52,
    term: "Edge Analytics",
    definition:
      "Edge analytics involves the analysis of data near the source of data generation rather than relying on a centralized data-processing warehouse. Edge analytics enables real-time insights and decision-making at the edge of the network, reducing latency. This approach is particularly valuable in scenarios where immediate action is required, such as in IoT applications or critical real-time monitoring.",
  },
  {
    id: 53,
    term: "Digital Twin",
    definition:
      "A digital twin is a digital representation of a real-world entity or system, often used for monitoring, analysis, and simulation. Digital twins provide a virtual counterpart for physical objects, facilitating improved understanding and management of assets. These digital replicas enable organizations to monitor performance, predict maintenance needs, and optimize the operation of complex systems such as manufacturing plants or smart cities.",
  },
  {
    id: 54,
    term: "Exo-Skeletons",
    definition:
      "Exo-skeletons are mechanical structures worn by humans to enhance physical capabilities, often used in industries or rehabilitation. Exoskeletons support and augment the wearer's strength and endurance, providing assistance in various tasks. In industrial settings, exoskeletons reduce physical strain, while in rehabilitation, they aid individuals in regaining mobility and strength after injuries or surgeries.",
    question: "Which field enables computers to interpret and make decisions based on visual data, such as images or videos?",
    options: [
      "Computer Vision",
      "Natural Language Processing",
      "Artificial Intelligence",
      "Machine Learning"
    ],
    answer: "Computer Vision"
  },
  {
    id: 55,
    term: "Spatial Computing",
    definition:
      "Spatial computing is a computing platform that uses the physical space around us as a medium to interact with digital information. By merging the physical and digital worlds, spatial computing enables immersive experiences and intuitive interactions. Augmented reality (AR) and virtual reality (VR) are examples of spatial computing technologies that enhance how users engage with digital content in real-world environments.",
  },
  {
    id: 56,
    term: "Dark Data",
    definition:
      "Dark data refers to unused or underutilized data that organizations collect but do not analyze or leverage for decision-making. This untapped data may include logs, archives, or information stored in databases that remains dormant. Organizations are increasingly exploring ways to extract valuable insights from dark data, realizing its potential to provide additional context, uncover hidden patterns, and support strategic decision-making.",
  },
  {
    id: 57,
    term: "Bioinformatics",
    definition:
      "Bioinformatics is the application of computational techniques to analyze biological data, such as DNA sequences. This interdisciplinary field combines biology, computer science, and statistics to extract meaningful insights from large datasets. Bioinformatics plays a crucial role in genomics, personalized medicine, and understanding the intricacies of biological systems, contributing to advancements in healthcare and life sciences.",
  },
  {
    id: 58,
    term: "Exponential Growth",
    definition:
      "Exponential growth is a pattern of growth in which a quantity multiplies by a fixed percentage at constant intervals, leading to rapid and continuous expansion. This concept is fundamental in various fields, including technology, finance, and population dynamics. Understanding exponential growth is essential for predicting trends, planning resource allocation, and assessing the potential impact of innovations in different domains.",
    question: "What field of AI enables computers to understand, interpret, and generate human language?",
    options: [
      "Natural Language Processing",
      "Computer Vision",
      "Artificial Intelligence",
      "Machine Learning"
    ],
    answer: "Natural Language Processing"
  },
  {
    id: 59,
    term: "Humanoid Robot",
    definition:
      "A humanoid robot is a robot with a human-like appearance and characteristics, designed to perform tasks in a human-like way. These robots often have a head, torso, arms, and legs, resembling the human body. Humanoid robots find applications in diverse fields, including healthcare, education, and entertainment. Their human-like features enable them to interact with people in socially intuitive ways.",
  },
  {
    id: 60,
    term: "Ethical AI",
    definition:
      "The practice of incorporating ethical considerations into the development and deployment of artificial intelligence systems. Ethical AI addresses issues such as bias, transparency, accountability, and the societal impact of AI technologies.",
  },
  {
    id: 61,
    term: "Social Robotics",
    definition:
      "The study of robots that interact and communicate with humans, often in social settings. Social robots aim to understand and respond to human emotions, facilitating natural and meaningful interactions.",
  },
  {
    id: 62,
    term: "Exocortex",
    definition:
      "A theoretical augmentation to the human brain through the integration of external processing units and information. The concept of an exocortex explores the potential of enhancing cognitive abilities by merging human intelligence with external computational resources.",
  },
  {
    id: 63,
    term: "RegTech (Regulatory Technology)",
    definition:
      "Technology designed to help financial institutions comply with regulatory requirements efficiently. RegTech solutions use advanced technologies, including AI and blockchain, to streamline regulatory processes and enhance compliance.",
  },
  {
    id: 64,
    term: "Green Computing",
    definition:
      "The practice of designing, using, and disposing of computing resources in an environmentally friendly way. Green computing focuses on energy efficiency, sustainable practices, and reducing the environmental impact of information technology.",
  },
  {
    id: 65,
    term: "Swarm Robotics",
    definition:
      "A field of robotics that studies the behavior of large groups of relatively simple robots working together to accomplish tasks. Swarm robotics draw inspiration from collective behaviors observed in social insects and aim to achieve efficient collaboration among robots.",
    question: "What is a computer program designed to simulate conversation with human users?",
    options: [
      "Chatbot",
      "Virtual Reality",
      "Algorithm",
      "Artificial Intelligence"
    ],
    answer: "Chatbot"
  },
  {
    id: 66,
    term: "Human-Computer Augmentation",
    definition:
      "The integration of technology into the human body to enhance physical or cognitive abilities. Human-computer augmentation technologies range from wearable devices to neural interfaces, seeking to augment human capabilities through technological enhancements.",
  },
  {
    id: 67,
    term: "Citizen Data Scientist",
    definition:
      "An individual who creates or generates models and insights from data, often without formal training in data science. Citizen data scientists leverage user-friendly tools and platforms to analyze data and contribute to data-driven decision-making.",
  },
  {
    id: 68,
    term: "Multi-Agent Systems",
    definition:
      "A computerized system composed of multiple interacting intelligent agents, each pursuing its own goals. Multi-agent systems find applications in areas such as robotics, game theory, and simulation, where autonomous agents collaborate or compete to achieve objectives.",
  },
  {
    id: 69,
    term: "Robotic Surgery",
    definition:
      "The use of robotic systems to assist in surgical procedures, allowing for precision and minimally invasive techniques. Robotic surgery enhances the surgeon's capabilities, offering greater precision and control during medical procedures.",
  },
  {
    id: 70,
    term: "Digital Ethics",
    definition:
      "The study and promotion of responsible and ethical behavior in the use of digital technologies. Digital ethics address concerns related to privacy, security, fairness, transparency, and the societal impact of technological advancements.",
    question: "What does 'IoT' stand for?",
    options: [
      "Internet of Technology",
      "Internet of Things",
      "Internet of Thoughts",
      "Internet of Tricks"
    ],
    answer: "Internet of Things"
  },
  {
    id: 71,
    term: "Conversational User Interface",
    definition:
      "An interface that allows users to interact with a computer or device using natural language, often through voice commands or text conversations. Conversational user interfaces, including chatbots and virtual assistants, aim to provide intuitive and human-like interactions.",
  },
  {
    id: 72,
    term: "Intelligent Automation",
    definition:
      "The integration of artificial intelligence and automation technologies to enhance business processes and decision-making. Intelligent automation combines machine learning, robotic process automation, and other technologies to automate complex tasks and workflows.",
  },
];

  
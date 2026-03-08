import { Book } from '@/types/library';

const HAND_PICKED: Omit<Book, 'id'>[] = [
  // Algorithms
  { title: 'Introduction to Algorithms', author: 'Thomas H. Cormen', category: 'Algorithms', isbn: '978-0-262-03384-8', quantity: 6, available: 4 },
  { title: 'Algorithms', author: 'Robert Sedgewick', category: 'Algorithms', isbn: '978-0-321-57351-3', quantity: 5, available: 5 },
  { title: 'The Algorithm Design Manual', author: 'Steven S. Skiena', category: 'Algorithms', isbn: '978-1-848-00070-4', quantity: 3, available: 2 },
  { title: 'Grokking Algorithms', author: 'Aditya Bhargava', category: 'Algorithms', isbn: '978-1-617-29284-1', quantity: 5, available: 5 },
  { title: 'Algorithms Unlocked', author: 'Thomas H. Cormen', category: 'Algorithms', isbn: '978-0-262-51880-2', quantity: 4, available: 4 },
  { title: 'Competitive Programming 3', author: 'Steven Halim', category: 'Algorithms', isbn: '978-9-793-26582-0', quantity: 2, available: 1 },
  { title: 'Algorithm Design', author: 'Jon Kleinberg', category: 'Algorithms', isbn: '978-0-321-29535-4', quantity: 4, available: 3 },
  { title: 'Algorithms in C++', author: 'Robert Sedgewick', category: 'Algorithms', isbn: '978-0-201-35088-3', quantity: 3, available: 3 },

  // Data Structures
  { title: 'Data Structures and Algorithms in Java', author: 'Robert Lafore', category: 'Data Structures', isbn: '978-0-672-32453-6', quantity: 4, available: 3 },
  { title: 'Data Structures Using C', author: 'Reema Thareja', category: 'Data Structures', isbn: '978-0-198-09930-7', quantity: 4, available: 3 },
  { title: 'Data Structures and Algorithm Analysis in C++', author: 'Mark Allen Weiss', category: 'Data Structures', isbn: '978-0-132-84737-7', quantity: 3, available: 2 },
  { title: 'Problem Solving with Algorithms and Data Structures', author: 'Bradley N. Miller', category: 'Data Structures', isbn: '978-1-590-28053-9', quantity: 3, available: 3 },
  { title: 'Data Structures with Python', author: 'Michael T. Goodrich', category: 'Data Structures', isbn: '978-1-118-29027-9', quantity: 4, available: 4 },
  { title: 'Open Data Structures', author: 'Pat Morin', category: 'Data Structures', isbn: '978-1-927-35600-7', quantity: 3, available: 3 },
  { title: 'Advanced Data Structures', author: 'Peter Brass', category: 'Data Structures', isbn: '978-0-521-88037-4', quantity: 2, available: 2 },
  { title: 'Purely Functional Data Structures', author: 'Chris Okasaki', category: 'Data Structures', isbn: '978-0-521-66350-2', quantity: 3, available: 2 },

  // Operating Systems
  { title: 'Operating System Concepts', author: 'Abraham Silberschatz', category: 'Operating Systems', isbn: '978-1-118-06333-0', quantity: 5, available: 3 },
  { title: 'Modern Operating Systems', author: 'Andrew S. Tanenbaum', category: 'Operating Systems', isbn: '978-0-133-59162-0', quantity: 4, available: 4 },
  { title: 'Operating Systems: Three Easy Pieces', author: 'Remzi H. Arpaci-Dusseau', category: 'Operating Systems', isbn: '978-1-985-08659-3', quantity: 6, available: 5 },
  { title: 'Linux Kernel Development', author: 'Robert Love', category: 'Operating Systems', isbn: '978-0-672-32946-3', quantity: 3, available: 2 },
  { title: 'Understanding the Linux Kernel', author: 'Daniel P. Bovet', category: 'Operating Systems', isbn: '978-0-596-00565-8', quantity: 3, available: 3 },
  { title: 'The Design of the UNIX Operating System', author: 'Maurice J. Bach', category: 'Operating Systems', isbn: '978-0-132-01757-5', quantity: 2, available: 1 },
  { title: 'Windows Internals Part 1', author: 'Pavel Yosifovich', category: 'Operating Systems', isbn: '978-0-735-68441-8', quantity: 3, available: 3 },
  { title: 'Operating Systems: Internals and Design', author: 'William Stallings', category: 'Operating Systems', isbn: '978-0-134-67014-0', quantity: 4, available: 2 },

  // Networking
  { title: 'Computer Networking: A Top-Down Approach', author: 'James Kurose', category: 'Networking', isbn: '978-0-133-59414-0', quantity: 5, available: 4 },
  { title: 'Computer Networks', author: 'Andrew S. Tanenbaum', category: 'Networking', isbn: '978-0-132-12695-3', quantity: 4, available: 3 },
  { title: 'TCP/IP Illustrated Volume 1', author: 'W. Richard Stevens', category: 'Networking', isbn: '978-0-321-33631-6', quantity: 3, available: 2 },
  { title: 'Network Warrior', author: 'Gary A. Donahue', category: 'Networking', isbn: '978-1-449-38799-0', quantity: 3, available: 3 },
  { title: 'CCNA 200-301 Official Cert Guide', author: 'Wendell Odom', category: 'Networking', isbn: '978-0-135-79231-7', quantity: 4, available: 4 },
  { title: 'Data Communications and Networking', author: 'Behrouz A. Forouzan', category: 'Networking', isbn: '978-0-073-37608-5', quantity: 5, available: 3 },
  { title: 'Network Security Essentials', author: 'William Stallings', category: 'Networking', isbn: '978-0-134-52733-8', quantity: 3, available: 2 },
  { title: 'HTTP: The Definitive Guide', author: 'David Gourley', category: 'Networking', isbn: '978-1-565-92509-0', quantity: 4, available: 4 },

  // Databases
  { title: 'Database System Concepts', author: 'Abraham Silberschatz', category: 'Databases', isbn: '978-0-078-02215-9', quantity: 5, available: 4 },
  { title: 'Fundamentals of Database Systems', author: 'Ramez Elmasri', category: 'Databases', isbn: '978-0-133-97077-7', quantity: 4, available: 3 },
  { title: 'Designing Data-Intensive Applications', author: 'Martin Kleppmann', category: 'Databases', isbn: '978-1-449-37332-0', quantity: 6, available: 5 },
  { title: 'SQL in 10 Minutes', author: 'Ben Forta', category: 'Databases', isbn: '978-0-672-33607-2', quantity: 5, available: 5 },
  { title: 'Learning SQL', author: 'Alan Beaulieu', category: 'Databases', isbn: '978-1-492-05761-1', quantity: 4, available: 4 },
  { title: 'NoSQL Distilled', author: 'Pramod J. Sadalage', category: 'Databases', isbn: '978-0-321-82662-6', quantity: 3, available: 2 },
  { title: 'MongoDB: The Definitive Guide', author: 'Shannon Bradshaw', category: 'Databases', isbn: '978-1-491-95446-1', quantity: 3, available: 3 },
  { title: 'Database Internals', author: 'Alex Petrov', category: 'Databases', isbn: '978-1-492-04034-7', quantity: 3, available: 2 },
  { title: 'High Performance MySQL', author: 'Baron Schwartz', category: 'Databases', isbn: '978-1-449-31428-6', quantity: 4, available: 3 },
  { title: 'PostgreSQL Up & Running', author: 'Regina O. Obe', category: 'Databases', isbn: '978-1-491-96341-8', quantity: 3, available: 3 },

  // Artificial Intelligence
  { title: 'Artificial Intelligence: A Modern Approach', author: 'Stuart Russell', category: 'Artificial Intelligence', isbn: '978-0-134-61099-3', quantity: 5, available: 3 },
  { title: 'Deep Learning', author: 'Ian Goodfellow', category: 'Artificial Intelligence', isbn: '978-0-262-03561-3', quantity: 4, available: 2 },
  { title: 'Hands-On Machine Learning', author: 'Aurélien Géron', category: 'Artificial Intelligence', isbn: '978-1-492-03264-9', quantity: 6, available: 5 },
  { title: 'Pattern Recognition and Machine Learning', author: 'Christopher M. Bishop', category: 'Artificial Intelligence', isbn: '978-0-387-31073-2', quantity: 3, available: 2 },
  { title: 'Natural Language Processing with Python', author: 'Steven Bird', category: 'Artificial Intelligence', isbn: '978-0-596-51649-9', quantity: 3, available: 3 },
  { title: 'Reinforcement Learning: An Introduction', author: 'Richard S. Sutton', category: 'Artificial Intelligence', isbn: '978-0-262-03924-6', quantity: 3, available: 2 },
  { title: 'The Hundred-Page Machine Learning Book', author: 'Andriy Burkov', category: 'Artificial Intelligence', isbn: '978-1-999-57950-0', quantity: 4, available: 4 },
  { title: 'AI Superpowers', author: 'Kai-Fu Lee', category: 'Artificial Intelligence', isbn: '978-1-328-54639-6', quantity: 4, available: 4 },

  // Machine Learning
  { title: 'Machine Learning Yearning', author: 'Andrew Ng', category: 'Machine Learning', isbn: '978-0-999-30040-5', quantity: 5, available: 5 },
  { title: 'Mathematics for Machine Learning', author: 'Marc Peter Deisenroth', category: 'Machine Learning', isbn: '978-1-108-45514-5', quantity: 3, available: 3 },
  { title: 'Machine Learning in Action', author: 'Peter Harrington', category: 'Machine Learning', isbn: '978-1-617-29018-2', quantity: 4, available: 3 },
  { title: 'Introduction to Machine Learning with Python', author: 'Andreas C. Müller', category: 'Machine Learning', isbn: '978-1-449-36941-5', quantity: 5, available: 4 },
  { title: 'Bayesian Reasoning and Machine Learning', author: 'David Barber', category: 'Machine Learning', isbn: '978-0-521-51814-7', quantity: 3, available: 2 },
  { title: 'Machine Learning: A Probabilistic Perspective', author: 'Kevin P. Murphy', category: 'Machine Learning', isbn: '978-0-262-01802-9', quantity: 3, available: 2 },
  { title: 'Feature Engineering for Machine Learning', author: 'Alice Zheng', category: 'Machine Learning', isbn: '978-1-491-95324-2', quantity: 4, available: 4 },
  { title: 'Interpretable Machine Learning', author: 'Christoph Molnar', category: 'Machine Learning', isbn: '978-0-244-76852-2', quantity: 3, available: 3 },

  // Software Engineering
  { title: 'Clean Code', author: 'Robert C. Martin', category: 'Software Engineering', isbn: '978-0-13-235088-4', quantity: 6, available: 5 },
  { title: 'The Pragmatic Programmer', author: 'Andrew Hunt', category: 'Software Engineering', isbn: '978-0-135-95705-9', quantity: 5, available: 4 },
  { title: 'Design Patterns', author: 'Erich Gamma', category: 'Software Engineering', isbn: '978-0-201-63361-0', quantity: 4, available: 3 },
  { title: 'Refactoring', author: 'Martin Fowler', category: 'Software Engineering', isbn: '978-0-134-75759-8', quantity: 3, available: 2 },
  { title: 'Software Engineering', author: 'Ian Sommerville', category: 'Software Engineering', isbn: '978-0-133-94303-0', quantity: 5, available: 5 },
  { title: 'Code Complete', author: 'Steve McConnell', category: 'Software Engineering', isbn: '978-0-735-61967-8', quantity: 4, available: 3 },
  { title: 'Head First Design Patterns', author: 'Eric Freeman', category: 'Software Engineering', isbn: '978-0-596-00712-6', quantity: 5, available: 5 },
  { title: 'Clean Architecture', author: 'Robert C. Martin', category: 'Software Engineering', isbn: '978-0-134-49416-6', quantity: 4, available: 3 },
  { title: 'Domain-Driven Design', author: 'Eric Evans', category: 'Software Engineering', isbn: '978-0-321-12521-7', quantity: 3, available: 2 },
  { title: 'The Phoenix Project', author: 'Gene Kim', category: 'Software Engineering', isbn: '978-1-942-78829-4', quantity: 5, available: 5 },

  // Programming
  { title: 'The C Programming Language', author: 'Brian W. Kernighan', category: 'Programming', isbn: '978-0-131-10362-7', quantity: 5, available: 4 },
  { title: 'Effective Java', author: 'Joshua Bloch', category: 'Programming', isbn: '978-0-134-68599-1', quantity: 4, available: 3 },
  { title: 'Python Crash Course', author: 'Eric Matthes', category: 'Programming', isbn: '978-1-593-27928-8', quantity: 6, available: 6 },
  { title: 'JavaScript: The Good Parts', author: 'Douglas Crockford', category: 'Programming', isbn: '978-0-596-51774-8', quantity: 4, available: 3 },
  { title: 'C++ Primer', author: 'Stanley B. Lippman', category: 'Programming', isbn: '978-0-321-71411-4', quantity: 4, available: 2 },
  { title: 'Eloquent JavaScript', author: 'Marijn Haverbeke', category: 'Programming', isbn: '978-1-593-27950-9', quantity: 5, available: 5 },
  { title: 'The Rust Programming Language', author: 'Steve Klabnik', category: 'Programming', isbn: '978-1-718-50044-0', quantity: 3, available: 3 },
  { title: 'Learning Go', author: 'Jon Bodner', category: 'Programming', isbn: '978-1-492-07720-6', quantity: 3, available: 2 },
  { title: 'Automate the Boring Stuff with Python', author: 'Al Sweigart', category: 'Programming', isbn: '978-1-593-27992-9', quantity: 5, available: 4 },
  { title: 'Programming in Scala', author: 'Martin Odersky', category: 'Programming', isbn: '978-0-981-53161-4', quantity: 3, available: 3 },

  // Computer Architecture
  { title: 'Computer Organization and Design', author: 'David A. Patterson', category: 'Computer Architecture', isbn: '978-0-124-07726-3', quantity: 4, available: 3 },
  { title: 'Computer Architecture: A Quantitative Approach', author: 'John L. Hennessy', category: 'Computer Architecture', isbn: '978-0-128-11905-1', quantity: 3, available: 2 },
  { title: 'Digital Design and Computer Architecture', author: 'David Harris', category: 'Computer Architecture', isbn: '978-0-123-94424-5', quantity: 4, available: 4 },
  { title: 'Structured Computer Organization', author: 'Andrew S. Tanenbaum', category: 'Computer Architecture', isbn: '978-0-132-91652-3', quantity: 3, available: 3 },
  { title: 'Introduction to Computing Systems', author: 'Yale N. Patt', category: 'Computer Architecture', isbn: '978-1-260-15053-4', quantity: 4, available: 3 },
  { title: 'Computer Systems: A Programmer\'s Perspective', author: 'Randal E. Bryant', category: 'Computer Architecture', isbn: '978-0-134-09266-9', quantity: 5, available: 4 },

  // Theory of Computation
  { title: 'Introduction to the Theory of Computation', author: 'Michael Sipser', category: 'Theory of Computation', isbn: '978-1-133-18779-0', quantity: 4, available: 3 },
  { title: 'Compilers: Principles, Techniques, and Tools', author: 'Alfred V. Aho', category: 'Theory of Computation', isbn: '978-0-321-48681-3', quantity: 3, available: 2 },
  { title: 'Discrete Mathematics and Its Applications', author: 'Kenneth H. Rosen', category: 'Theory of Computation', isbn: '978-0-073-38309-5', quantity: 5, available: 4 },
  { title: 'Formal Languages and Automata Theory', author: 'Peter Linz', category: 'Theory of Computation', isbn: '978-1-284-07724-2', quantity: 3, available: 3 },
  { title: 'Concrete Mathematics', author: 'Ronald L. Graham', category: 'Theory of Computation', isbn: '978-0-201-55802-9', quantity: 3, available: 2 },

  // Cybersecurity
  { title: 'The Web Application Hacker\'s Handbook', author: 'Dafydd Stuttard', category: 'Cybersecurity', isbn: '978-1-118-02647-2', quantity: 4, available: 3 },
  { title: 'Hacking: The Art of Exploitation', author: 'Jon Erickson', category: 'Cybersecurity', isbn: '978-1-593-27144-2', quantity: 3, available: 2 },
  { title: 'Cryptography and Network Security', author: 'William Stallings', category: 'Cybersecurity', isbn: '978-0-134-44428-8', quantity: 5, available: 4 },
  { title: 'Practical Malware Analysis', author: 'Michael Sikorski', category: 'Cybersecurity', isbn: '978-1-593-27290-6', quantity: 3, available: 3 },
  { title: 'Security Engineering', author: 'Ross Anderson', category: 'Cybersecurity', isbn: '978-1-119-64278-7', quantity: 3, available: 2 },
  { title: 'Penetration Testing', author: 'Georgia Weidman', category: 'Cybersecurity', isbn: '978-1-593-27564-8', quantity: 4, available: 4 },
  { title: 'Black Hat Python', author: 'Justin Seitz', category: 'Cybersecurity', isbn: '978-1-718-50112-6', quantity: 3, available: 3 },
  { title: 'Applied Cryptography', author: 'Bruce Schneier', category: 'Cybersecurity', isbn: '978-1-119-09672-6', quantity: 2, available: 1 },

  // Web Development
  { title: 'Learning React', author: 'Alex Banks', category: 'Web Development', isbn: '978-1-492-05172-5', quantity: 5, available: 4 },
  { title: 'Full-Stack React, TypeScript, and Node', author: 'David Choi', category: 'Web Development', isbn: '978-1-839-21993-1', quantity: 4, available: 3 },
  { title: 'Node.js Design Patterns', author: 'Mario Casciaro', category: 'Web Development', isbn: '978-1-839-21411-0', quantity: 3, available: 3 },
  { title: 'CSS in Depth', author: 'Keith J. Grant', category: 'Web Development', isbn: '978-1-617-29345-9', quantity: 4, available: 4 },
  { title: 'Django for Beginners', author: 'William S. Vincent', category: 'Web Development', isbn: '978-1-735-46702-4', quantity: 3, available: 3 },
  { title: 'Vue.js 3 Cookbook', author: 'Heitor Ramon Ribeiro', category: 'Web Development', isbn: '978-1-838-82697-1', quantity: 3, available: 3 },
  { title: 'Angular Development with TypeScript', author: 'Yakov Fain', category: 'Web Development', isbn: '978-1-617-29548-4', quantity: 4, available: 3 },
  { title: 'Web Development with Node and Express', author: 'Ethan Brown', category: 'Web Development', isbn: '978-1-492-05351-4', quantity: 3, available: 2 },

  // Cloud Computing
  { title: 'Kubernetes in Action', author: 'Marko Luksa', category: 'Cloud Computing', isbn: '978-1-617-29372-5', quantity: 3, available: 2 },
  { title: 'Docker Deep Dive', author: 'Nigel Poulton', category: 'Cloud Computing', isbn: '978-1-916-58530-8', quantity: 4, available: 4 },
  { title: 'Cloud Native Patterns', author: 'Cornelia Davis', category: 'Cloud Computing', isbn: '978-1-617-29419-7', quantity: 3, available: 3 },
  { title: 'Site Reliability Engineering', author: 'Betsy Beyer', category: 'Cloud Computing', isbn: '978-1-491-92912-4', quantity: 4, available: 3 },
  { title: 'AWS in Action', author: 'Andreas Wittig', category: 'Cloud Computing', isbn: '978-1-617-29544-6', quantity: 4, available: 4 },
  { title: 'Google Cloud Platform in Action', author: 'JJ Geewax', category: 'Cloud Computing', isbn: '978-1-617-29395-4', quantity: 3, available: 3 },
  { title: 'Terraform: Up & Running', author: 'Yevgeniy Brikman', category: 'Cloud Computing', isbn: '978-1-492-04690-5', quantity: 4, available: 3 },
  { title: 'Cloud Computing: Concepts, Technology & Architecture', author: 'Thomas Erl', category: 'Cloud Computing', isbn: '978-0-133-38752-0', quantity: 3, available: 2 },
];

// Generate additional books to reach 150+ total
const EXTRA_TITLES: Record<string, { titles: string[]; authors: string[] }> = {
  'Algorithms': {
    titles: ['Advanced Algorithm Design', 'Randomized Algorithms', 'Approximation Algorithms', 'Graph Algorithms', 'Parallel Algorithms'],
    authors: ['Tim Roughgarden', 'Rajeev Motwani', 'Vijay V. Vazirani', 'Mark Newman', 'Guy E. Blelloch'],
  },
  'Data Structures': {
    titles: ['Succinct Data Structures', 'Persistent Data Structures', 'Probabilistic Data Structures'],
    authors: ['Gonzalo Navarro', 'Robert Tarjan', 'Andrei Broder'],
  },
  'Operating Systems': {
    titles: ['Embedded Operating Systems', 'Real-Time Operating Systems'],
    authors: ['Alan Holt', 'Jim Cooling'],
  },
  'Networking': {
    titles: ['Software Defined Networking', 'Wireless Networks', 'Network Programming with Go'],
    authors: ['Paul Goransson', 'Matthew Gast', 'Adam Woodbeck'],
  },
  'Databases': {
    titles: ['Graph Databases', 'Time Series Databases', 'Streaming Systems'],
    authors: ['Ian Robinson', 'Ted Dunning', 'Tyler Akidau'],
  },
  'Artificial Intelligence': {
    titles: ['Computer Vision: Algorithms and Applications', 'Speech and Language Processing', 'Probabilistic Robotics'],
    authors: ['Richard Szeliski', 'Dan Jurafsky', 'Sebastian Thrun'],
  },
  'Machine Learning': {
    titles: ['Deep Learning with Python', 'Practical Deep Learning for Cloud', 'AutoML: Methods, Systems, Challenges'],
    authors: ['François Chollet', 'Anirudh Koul', 'Frank Hutter'],
  },
  'Software Engineering': {
    titles: ['Continuous Delivery', 'Working Effectively with Legacy Code'],
    authors: ['Jez Humble', 'Michael C. Feathers'],
  },
  'Programming': {
    titles: ['Kotlin in Action', 'Programming TypeScript', 'Fluent Python'],
    authors: ['Dmitry Jemerov', 'Boris Cherny', 'Luciano Ramalho'],
  },
  'Cybersecurity': {
    titles: ['Malware Data Science', 'Threat Modeling'],
    authors: ['Joshua Saxe', 'Adam Shostack'],
  },
  'Web Development': {
    titles: ['Svelte and Sapper in Action', 'Progressive Web Apps'],
    authors: ['Mark Volkmann', 'Jason Grigsby'],
  },
  'Cloud Computing': {
    titles: ['Infrastructure as Code', 'Cloud Security'],
    authors: ['Kief Morris', 'Chris Dotson'],
  },
};

function generateISBN(seed: number): string {
  const s = String(seed).padStart(4, '0');
  return `978-0-${s.slice(0,3)}-${s.slice(0,5).padEnd(5,'0')}-${seed % 10}`;
}

function buildAllBooks(): Book[] {
  const books: Book[] = HAND_PICKED.map((b, i) => ({ ...b, id: `cs${i + 1}` }));

  let extraId = books.length + 1;
  for (const [cat, data] of Object.entries(EXTRA_TITLES)) {
    data.titles.forEach((title, i) => {
      books.push({
        id: `cs${extraId}`,
        title,
        author: data.authors[i] || data.authors[0],
        category: cat,
        isbn: generateISBN(extraId),
        quantity: 3 + (extraId % 4),
        available: 2 + (extraId % 3),
      });
      extraId++;
    });
  }

  return books;
}

export const CS_BOOKS: Book[] = buildAllBooks();

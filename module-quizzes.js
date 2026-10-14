(() => {
  const quizzes = {
    'day-1': [
      {
        question: 'What is SAP primarily known for providing to businesses?',
        options: ['Enterprise software for managing business operations', 'A public social network', 'A consumer email service'],
        answer: 0,
        explanation: 'SAP provides enterprise software for processes such as finance, HR, procurement, and supply chains.'
      },
      {
        question: 'What is the role of an integration developer in a connected business landscape?',
        options: ['Manually re-enter data between systems', 'Build and operate secure connections between systems', 'Replace every business application with one tool'],
        answer: 1,
        explanation: 'Integration developers design, build, secure, and monitor data flows between applications.'
      },
      {
        question: 'What is an integration flow (iFlow) used for?',
        options: ['Orchestrating how messages move and are processed between systems', 'Creating user accounts in SAP', 'Designing a company website'],
        answer: 0,
        explanation: 'An iFlow models the message path, processing steps, and connections between sender and receiver systems.'
      }
    ],
    'day-2': [
      {
        question: 'What is the SAP Discovery Center useful for?',
        options: ['Exploring SAP services, missions, and implementation guidance', 'Creating a personal email inbox', 'Replacing the SAP Help Portal'],
        answer: 0,
        explanation: 'The Discovery Center helps users explore SAP solutions and guided missions.'
      },
      {
        question: 'What is a common purpose of the SAP Business Accelerator Hub?',
        options: ['Finding APIs and integration content for SAP solutions', 'Managing employee payroll directly', 'Monitoring a laptop battery'],
        answer: 0,
        explanation: 'The Hub provides discoverable APIs, events, and integration content for SAP and partner solutions.'
      },
      {
        question: 'What should you check before reusing a discovered integration package?',
        options: ['Its prerequisites and compatibility with your systems', 'Only the package icon color', 'Whether it eliminates the need for testing'],
        answer: 0,
        explanation: 'Check prerequisites, supported versions, configuration, and security before adapting content.'
      }
    ],
    'day-3': [
      {
        question: 'Where should you look for official product instructions and technical reference material?',
        options: ['SAP Help Portal', 'A social media comment thread', 'A browser history export'],
        answer: 0,
        explanation: 'SAP Help Portal contains official product documentation and technical guidance.'
      },
      {
        question: 'What is SAP Learning Hub mainly designed to support?',
        options: ['Structured learning and training resources', 'Production message monitoring', 'API request routing'],
        answer: 0,
        explanation: 'Learning Hub offers structured courses and learning resources.'
      },
      {
        question: 'When is SAP Community especially helpful?',
        options: ['When discussing questions and practical experiences with peers', 'When storing production credentials', 'When deploying an iFlow automatically'],
        answer: 0,
        explanation: 'SAP Community supports peer discussion and knowledge sharing; it does not replace official documentation.'
      }
    ],
    'day-4': [
      {
        question: 'Which statement best describes REST?',
        options: ['An architectural style commonly using HTTP resources and methods', 'A file transfer protocol that requires a private key', 'A format only used by SAP IDocs'],
        answer: 0,
        explanation: 'REST commonly models resources accessed with HTTP methods such as GET, POST, PUT, and DELETE.'
      },
      {
        question: 'Which protocol is commonly associated with SOAP web services?',
        options: ['XML-based messages and a service contract such as WSDL', 'CSV files sent over email', 'A browser-only rendering format'],
        answer: 0,
        explanation: 'SOAP uses structured XML messages and service contracts, commonly described with WSDL.'
      },
      {
        question: 'What is an IDoc used for in SAP integration?',
        options: ['Exchanging structured business documents', 'Rendering a page stylesheet', 'Encrypting a user password in a browser'],
        answer: 0,
        explanation: 'IDocs are structured SAP business documents used to exchange data between systems.'
      }
    ],
    'day-5': [
      {
        question: 'What does SAP BTP provide?',
        options: ['A platform for building, integrating, and extending business solutions', 'Only an on-premises database', 'A replacement for all network protocols'],
        answer: 0,
        explanation: 'SAP BTP provides platform capabilities for application development, integration, data, and automation.'
      },
      {
        question: 'What is Cloud Foundry in the SAP BTP context?',
        options: ['A runtime environment for deploying cloud applications', 'A protocol for exchanging IDocs', 'An API authentication method'],
        answer: 0,
        explanation: 'Cloud Foundry is one of the runtime environments available on SAP BTP.'
      },
      {
        question: 'Why use a trial account when learning SAP BTP?',
        options: ['To explore selected platform services in a learning environment', 'To bypass production security controls', 'To guarantee every paid service is available without limits'],
        answer: 0,
        explanation: 'A trial account provides a way to explore supported services, subject to trial availability and limits.'
      }
    ],
    'day-6': [
      {
        question: 'What distinguishes an AI agent from a simple one-shot text generator?',
        options: ['It can work toward a goal using steps and available tools', 'It can access every system without permission', 'It always produces a correct result'],
        answer: 0,
        explanation: 'An agent can plan or take steps toward a goal, often using tools under configured permissions.'
      },
      {
        question: 'Why should an agent’s tool access be limited?',
        options: ['To reduce unintended actions and protect data', 'To make its responses longer', 'To prevent it from receiving any user input'],
        answer: 0,
        explanation: 'Least-privilege tool access helps limit the impact of errors or unintended actions.'
      },
      {
        question: 'What is an important practice when using AI-generated output?',
        options: ['Validate it before relying on it or executing actions', 'Assume it is always current and correct', 'Share credentials so it can work faster'],
        answer: 0,
        explanation: 'AI output can be incorrect or incomplete, so review it before using it in a real workflow.'
      }
    ],
    'day-7': [
      {
        question: 'What is SAP Integration Suite used for?',
        options: ['Connecting applications and orchestrating integration scenarios', 'Replacing all enterprise security policies', 'Managing source code revisions only'],
        answer: 0,
        explanation: 'Integration Suite provides capabilities for connecting applications and integrating business processes.'
      },
      {
        question: 'What does subscribing to a service generally do in SAP BTP?',
        options: ['Makes the service available in the selected subaccount', 'Automatically configures every integration flow', 'Publishes credentials to all users'],
        answer: 0,
        explanation: 'A subscription enables access to a service in a subaccount; configuration and role assignment may still be needed.'
      },
      {
        question: 'After activating a service, what is a sensible next step?',
        options: ['Verify access, roles, and required service configuration', 'Assume all users have administrator rights', 'Delete the subaccount'],
        answer: 0,
        explanation: 'Check service status, role assignments, and configuration before starting development.'
      }
    ],
    'day-8': [
      {
        question: 'What is an integration flow designed to define?',
        options: ['How messages are received, processed, and delivered', 'How a cloud tenant is billed', 'How source code is compiled on a laptop'],
        answer: 0,
        explanation: 'An iFlow describes the processing and routing steps between communicating systems.'
      },
      {
        question: 'What is XSLT commonly used for in an integration flow?',
        options: ['Transforming XML documents', 'Opening an encrypted network tunnel', 'Storing user passwords'],
        answer: 0,
        explanation: 'XSLT transforms XML documents from one structure into another.'
      },
      {
        question: 'What do sender and receiver adapters generally configure?',
        options: ['How an iFlow communicates with its source and target', 'How a user changes the site theme', 'How assessment scores are calculated'],
        answer: 0,
        explanation: 'Adapters configure the protocol-specific communication between an iFlow and connected systems.'
      }
    ],
    'day-9': [
      {
        question: 'What is SAP Cloud Connector commonly used to provide?',
        options: ['A controlled connection from SAP BTP to selected on-premises systems', 'A public endpoint for every internal server', 'A replacement for identity management'],
        answer: 0,
        explanation: 'Cloud Connector enables secure, controlled access from SAP BTP to selected on-premises resources.'
      },
      {
        question: 'Why configure only the required resources in Cloud Connector?',
        options: ['To limit exposure to the specific systems and paths needed', 'To make every internal host publicly reachable', 'To avoid maintaining access controls'],
        answer: 0,
        explanation: 'Restricting exposed resources follows least-privilege principles and reduces risk.'
      },
      {
        question: 'What is a common transformation when importing tabular data?',
        options: ['Convert CSV records into a structured format such as XML', 'Convert every value into an image', 'Disable validation of all fields'],
        answer: 0,
        explanation: 'CSV data is often parsed and transformed into a structured format for downstream processing.'
      }
    ],
    'day-10': [
      {
        question: 'What is pre-packaged integration content intended to provide?',
        options: ['Reusable integration artifacts that can be configured for a scenario', 'A guarantee that no configuration or testing is needed', 'A database of user passwords'],
        answer: 0,
        explanation: 'Pre-packaged content can accelerate development, but it still needs configuration and validation.'
      },
      {
        question: 'What is Postman useful for when working with APIs?',
        options: ['Sending requests and inspecting responses', 'Creating a Cloud Foundry organization', 'Encrypting an iFlow automatically'],
        answer: 0,
        explanation: 'Postman can help developers construct API requests and inspect responses during testing.'
      },
      {
        question: 'What should you do before deploying reused package content?',
        options: ['Review configuration, credentials, and test results', 'Assume its defaults match your tenant', 'Remove its error handling'],
        answer: 0,
        explanation: 'Review parameters and security settings, then test the content in the target environment.'
      }
    ],
    'day-11': [
      {
        question: 'What does a multicast step allow an integration flow to do?',
        options: ['Send a message through multiple processing branches', 'Store a password in a message header', 'Create an API product automatically'],
        answer: 0,
        explanation: 'Multicast routes a message to multiple branches for parallel or sequential processing.'
      },
      {
        question: 'When is a Local Process Call useful?',
        options: ['When reusing a local process within an integration flow', 'When calling an external public API without an adapter', 'When changing the runtime environment'],
        answer: 0,
        explanation: 'A Local Process Call invokes a reusable local process in the same integration flow.'
      },
      {
        question: 'What is a common use for a Groovy script in Cloud Integration?',
        options: ['Custom message processing when standard steps are insufficient', 'Replacing all tenant monitoring', 'Creating an OAuth identity provider'],
        answer: 0,
        explanation: 'Groovy scripts provide custom processing logic; use them judiciously when standard steps do not fit.'
      }
    ],
    'day-12': [
      {
        question: 'What does an adapter typically provide in Cloud Integration?',
        options: ['Protocol-specific connectivity to a system or service', 'A complete business process without configuration', 'A replacement for message mapping'],
        answer: 0,
        explanation: 'Adapters handle protocol-specific communication between an integration flow and an endpoint.'
      },
      {
        question: 'Which adapter is intended for secure file transfer?',
        options: ['SFTP adapter', 'OData adapter', 'AMQP adapter'],
        answer: 0,
        explanation: 'SFTP is commonly used to transfer files securely over SSH.'
      },
      {
        question: 'What is OData commonly used to expose?',
        options: ['Resources through a web API with queryable entities', 'Files over an SSH session', 'Messages over an email transport'],
        answer: 0,
        explanation: 'OData is a web protocol for querying and updating data through standardized APIs.'
      }
    ],
    'day-13': [
      {
        question: 'What is a keystore commonly used to hold?',
        options: ['Certificates and cryptographic keys used by a runtime', 'Unencrypted copies of all business messages', 'A list of training topics'],
        answer: 0,
        explanation: 'A keystore securely manages certificates and key material needed for cryptographic operations.'
      },
      {
        question: 'Where should credentials for an integration endpoint be stored?',
        options: ['In managed security material rather than hard-coded in a script', 'In a public source repository', 'In a message payload shared with every receiver'],
        answer: 0,
        explanation: 'Use the platform’s managed security material so credentials are not embedded in code or messages.'
      },
      {
        question: 'What does a connectivity test help verify?',
        options: ['Whether the configured endpoint can be reached with the selected connection settings', 'Whether all business data is correct', 'Whether a user has completed every training module'],
        answer: 0,
        explanation: 'A connectivity test helps diagnose connection settings; it does not prove the whole integration is correct.'
      }
    ],
    'day-14': [
      {
        question: 'What is message monitoring used for?',
        options: ['Inspecting message processing status and diagnosing failures', 'Editing API documentation', 'Creating a Cloud Foundry space'],
        answer: 0,
        explanation: 'Monitoring helps track message status and investigate processing issues.'
      },
      {
        question: 'Why adjust log levels carefully?',
        options: ['Detailed logs can expose sensitive data and increase log volume', 'Log levels control API authentication', 'Higher log levels always improve performance'],
        answer: 0,
        explanation: 'Use the least detailed logging needed and avoid capturing sensitive payload data unnecessarily.'
      },
      {
        question: 'What is the purpose of transport management?',
        options: ['Moving integration artifacts between development lifecycle environments', 'Transferring payroll files to employees', 'Replacing endpoint authorization'],
        answer: 0,
        explanation: 'Transport management supports controlled movement of artifacts between environments.'
      }
    ],
    'day-15': [
      {
        question: 'What is API Management primarily intended to help with?',
        options: ['Publishing, securing, and governing APIs', 'Replacing the backend application', 'Converting every message to XML'],
        answer: 0,
        explanation: 'API Management helps expose APIs with policies, documentation, and lifecycle controls.'
      },
      {
        question: 'What is a policy in API Management?',
        options: ['A reusable rule applied to API request or response processing', 'A Cloud Foundry deployment package', 'A database table for module progress'],
        answer: 0,
        explanation: 'Policies apply behavior such as security checks, traffic control, or message transformation.'
      },
      {
        question: 'What role does an API Portal commonly serve?',
        options: ['Helping developers discover API documentation and access details', 'Running integration flows in place of a runtime', 'Storing private keys for every consumer'],
        answer: 0,
        explanation: 'A portal helps API consumers discover documentation and request or manage access.'
      }
    ]
  };

  function initializeModuleQuiz(container, moduleId) {
    container.className = 'module-quiz';
    container.setAttribute('aria-labelledby', `quiz-title-${moduleId}`);
    const questions = (quizzes[moduleId] || []).map((question) => {
      const optionIndexes = question.options.map((_, index) => index);
      for (let index = optionIndexes.length - 1; index > 0; index -= 1) {
        const swapIndex = Math.floor(Math.random() * (index + 1));
        [optionIndexes[index], optionIndexes[swapIndex]] = [optionIndexes[swapIndex], optionIndexes[index]];
      }
      return {
        ...question,
        options: optionIndexes.map((index) => question.options[index]),
        answer: optionIndexes.indexOf(question.answer)
      };
    });

    if (!questions.length) {
      const title = document.createElement('h2');
      title.id = `quiz-title-${moduleId}`;
      title.textContent = 'Knowledge check';
      const message = document.createElement('p');
      message.className = 'module-quiz-intro';
      message.textContent = 'Quiz questions are not available for this module yet.';
      container.append(title, message);
      return;
    }

    const title = document.createElement('h2');
    title.id = `quiz-title-${moduleId}`;
    title.textContent = 'Knowledge check';
    const intro = document.createElement('p');
    intro.className = 'module-quiz-intro';
    intro.textContent = `Answer ${questions.length} questions, then check your answers. Scores are saved to My Learning.`;
    const status = document.createElement('p');
    status.className = 'module-quiz-status';
    status.setAttribute('aria-live', 'polite');
    status.textContent = 'Loading your saved scores...';
    const form = document.createElement('form');
    const result = document.createElement('p');
    result.className = 'module-quiz-result';
    result.setAttribute('aria-live', 'polite');
    const submit = document.createElement('button');
    submit.className = 'module-quiz-submit';
    submit.type = 'submit';
    submit.textContent = 'Check answers';
    const retake = document.createElement('button');
    retake.className = 'module-quiz-retake';
    retake.type = 'button';
    retake.textContent = 'Retake quiz';
    retake.hidden = true;
    form.append(result);

    questions.forEach((item, questionIndex) => {
      const fieldset = document.createElement('fieldset');
      fieldset.className = 'module-quiz-question';
      const legend = document.createElement('legend');
      legend.textContent = `${questionIndex + 1}. ${item.question}`;
      fieldset.append(legend);

      item.options.forEach((option, optionIndex) => {
        const label = document.createElement('label');
        label.className = 'module-quiz-option';
        const input = document.createElement('input');
        input.type = 'radio';
        input.name = `${moduleId}-question-${questionIndex}`;
        input.value = String(optionIndex);
        input.required = true;
        const text = document.createElement('span');
        text.textContent = option;
        label.append(input, text);
        fieldset.append(label);
      });

      form.append(fieldset);
    });

    form.append(submit, retake);
    container.append(title, intro, status, form);

    window.learningAccount.loadQuizAttempts(moduleId).then((attempts) => {
      if (!attempts.length) {
        status.textContent = 'No saved attempts yet.';
        return;
      }
      const best = attempts.reduce((current, attempt) => (
        attempt.score / attempt.question_count > current.score / current.question_count ? attempt : current
      ));
      status.textContent = `Best of your last 20 attempts: ${best.score}/${best.question_count} · ${attempts.length} saved ${attempts.length === 1 ? 'attempt' : 'attempts'}.`;
    }).catch(() => {
      status.textContent = 'Saved scores could not be loaded. Check the account database setup.';
    });

    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      const answers = questions.map((item, questionIndex) => {
        const selected = form.querySelector(`input[name="${moduleId}-question-${questionIndex}"]:checked`);
        return selected ? Number(selected.value) : -1;
      });
      const score = answers.reduce((total, answer, index) => total + Number(answer === questions[index].answer), 0);
      result.textContent = `You scored ${score} out of ${questions.length} (${Math.round((score / questions.length) * 100)}%).`;

      form.querySelectorAll('input').forEach((input) => { input.disabled = true; });
      questions.forEach((item, questionIndex) => {
        const explanation = document.createElement('p');
        explanation.className = 'module-quiz-explanation';
        explanation.textContent = `${answers[questionIndex] === item.answer ? 'Correct.' : `Correct answer: ${item.options[item.answer]}.`} ${item.explanation}`;
        form.querySelector(`.module-quiz-question:nth-of-type(${questionIndex + 1})`).append(explanation);
      });

      submit.disabled = true;
      status.textContent = 'Saving your score...';
      try {
        await window.learningAccount.saveQuizAttempt(moduleId, score, questions.length);
        status.textContent = 'Score saved to My Learning.';
      } catch {
        status.textContent = 'Your answers were checked, but the score could not be saved. Check the account database setup.';
      } finally {
        submit.hidden = true;
        retake.hidden = false;
      }
    });

    retake.addEventListener('click', () => {
      form.reset();
      form.querySelectorAll('input').forEach((input) => { input.disabled = false; });
      form.querySelectorAll('.module-quiz-explanation').forEach((node) => node.remove());
      result.textContent = '';
      submit.disabled = false;
      submit.hidden = false;
      retake.hidden = true;
      status.textContent = 'Try again when you’re ready.';
    });
  }

  window.initializeModuleQuiz = initializeModuleQuiz;
})();

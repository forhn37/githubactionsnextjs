// 브라우저 콘솔에서 practice.exampleOne() ~ practice.exampleTen() 형태로 실행

const practice = {
  // 예제 1: 콜백 패턴과 고차함수
  exampleOne: () => {
    console.log("=== 예제 1: 콜백 패턴과 고차함수 ===");

    function calculate(a, b, operation) {
      if (typeof operation === "function") {
        return operation(a, b);
      } else {
        return "연산 함수가 필요합니다.";
      }
    }

    const add = (x, y) => {
      return x + y;
    };

    const multiply = (x, y) => {
      return x * y;
    };

    const greet = (name, age) => {
      return `안녕하세요! ${name}님, ${age}세시네요.`;
    };
    

    console.log("덧셈:", calculate(5, 3, add));
    console.log("곱셈:", calculate(5, 3, multiply));
    console.log("인사:", calculate("철수", 25, greet));

    const result = calculate(10, 2, (a, b) => {
      return a - b;
    });
    console.log("뺄셈:", result);
  },

  // 예제 2: 객체를 매개변수로 받는 함수 (props 패턴)
  exampleTwo: () => {
    console.log("=== 예제 2: 객체 매개변수 패턴 ===");

    function processStudent(studentProps) {
      if (typeof studentProps !== "object") {
        return "학생 정보 객체가 필요합니다.";
      }

      let result = {};

      for (let key in studentProps) {
        if (key === "name") {
          result.greeting = `안녕하세요, ${studentProps[key]}님!`;
        }
        if (key === "grade") {
          if (studentProps[key] >= 90) {
            result.level = "우수";
          } else {
            result.level = "보통";
          }
        }
        if (key === "hobby") {
          result.interest = `${studentProps[key]}을/를 좋아하시는군요!`;
        }
      }
      return result;
    }

    const students = [
      { name: "김영희", grade: 95, hobby: "독서" },
      { name: "박민수", grade: 78, hobby: "게임" },
      { name: "이철수", grade: 85, hobby: "음악" },
    ];

    // const studentYaho ={
    //   yaho : {ane : "20"}
    // }

    students.forEach((student) => {
      console.log(`${student.name} 처리결과:`, processStudent(students));
    });

    const excellentStudents = students.filter((student) => {
      if (student.grade >= 90) {
        return true;
      } else {
        return false;
      }
    });

    console.log("우수한 학생들:", excellentStudents);
  },

  // 예제 3: this 바인딩 비교
  exampleThree: () => {
    console.log("=== 예제 3: this 바인딩 비교 ===");

    const testObject = {
      name: "테스트 객체",
      count: 0,

      normalFunction: function () {
        console.log("일반 함수의 this.name:", this.name);

        function inner() {
          console.log("내부 일반 함수의 this:", this);
        }
        inner();
      },

      arrowFunction: () => {
        console.log("화살표 함수의 this:", this);
      },

      mixedFunction: function () {
        console.log("외부 일반 함수의 this.name:", this.name);

        const innerArrow = () => {
          console.log("내부 화살표 함수의 this.name:", this.name);
          return this.name;
        };

        const result = innerArrow();
        return result;
      },

      incrementCounter: function () {
        this.count = this.count + 1;
        console.log("현재 카운트:", this.count);

        const processCount = (num) => {
          if (num > 5) {
            return "높은 숫자입니다";
          } else {
            return "낮은 숫자입니다";
          }
        };

        console.log("카운트 상태:", processCount(this.count));
      },
    };

    testObject.normalFunction();
    testObject.arrowFunction();
    testObject.mixedFunction();
    testObject.incrementCounter();
    testObject.incrementCounter();
  },

  // 예제 4: 배열과 객체 메서드 활용
  exampleFour: () => {
    console.log("=== 예제 4: 배열과 객체 메서드 ===");

    const inventory = {
      apple: 10,
      banana: 5,
      orange: 8,
      grape: 12,
      strawberry: 3,
    };

    function analyzeInventory(items) {
      const keys = Object.keys(items);
      const values = Object.values(items);
      const entries = Object.entries(items);

      console.log("과일 종류:", keys);
      console.log("수량 목록:", values);

      let total = 0;
      values.forEach((count) => {
        total = total + count;
      });

      let lowStock = [];
      let highStock = [];

      entries.forEach((entry) => {
        const fruit = entry[0];
        const count = entry[1];

        if (count < 8) {
          lowStock.push(fruit);
        } else {
          highStock.push(fruit);
        }
      });

      const stockStatus = entries.map((entry) => {
        const fruit = entry[0];
        const count = entry[1];
        let status = "";

        if (count < 5) {
          status = "부족";
        } else if (count >= 10) {
          status = "충분";
        } else {
          status = "보통";
        }

        return {
          name: fruit,
          count: count,
          status: status,
        };
      });

      return {
        totalItems: total,
        lowStockItems: lowStock,
        highStockItems: highStock,
        averageStock: Math.round(total / keys.length),
        detailStatus: stockStatus,
      };
    }

    const analysis = analyzeInventory(inventory);
    console.log("재고 분석 결과:", analysis);

    analysis.detailStatus.forEach((item) => {
      console.log(`${item.name}: ${item.count}개 (${item.status})`);
    });
  },

  // 예제 5: 문자열 처리와 정규표현식
  exampleFive: () => {
    console.log("=== 예제 5: 문자열 처리 ===");

    const textProcessor = {
      processText: function (text) {
        if (typeof text !== "string") {
          return "문자열이 필요합니다.";
        }

        const result = {
          original: text,
          length: text.length,
          upperCase: text.toUpperCase(),
          lowerCase: text.toLowerCase(),
          words: text.split(" "),
          reversed: text.split("").reverse().join(""),
        };

        return result;
      },

      validateEmail: function (email) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailPattern.test(email)) {
          return "유효한 이메일입니다.";
        } else {
          return "유효하지 않은 이메일입니다.";
        }
      },

      extractNumbers: function (text) {
        const numbers = text.match(/\d+/g);
        if (numbers) {
          return numbers.map((num) => {
            return parseInt(num);
          });
        } else {
          return [];
        }
      },
    };

    const sampleText = "Hello World 123 JavaScript 456!";
    console.log("텍스트 처리:", textProcessor.processText(sampleText));
    console.log(
      "이메일 검증:",
      textProcessor.validateEmail("test@example.com")
    );
    console.log("숫자 추출:", textProcessor.extractNumbers(sampleText));
  },

  // 예제 6: 비동기 패턴 시뮬레이션
  exampleSix: () => {
    console.log("=== 예제 6: 비동기 패턴 시뮬레이션 ===");

    function simulateAsyncOperation(taskName, delay, callback) {
      console.log(`${taskName} 작업 시작...`);

      setTimeout(() => {
        const result = {
          task: taskName,
          completed: true,
          timestamp: new Date().toLocaleTimeString(),
          data: `${taskName}의 결과 데이터`,
        };
        callback(result);
      }, delay);
    }

    const handleResult = (result) => {
      console.log("작업 완료:", result);
    };

    simulateAsyncOperation("데이터 로딩", 1000, handleResult);
    simulateAsyncOperation("API 호출", 1500, handleResult);

    // 연속된 비동기 호출
    simulateAsyncOperation("첫 번째 작업", 500, (result1) => {
      console.log("1단계 완료:", result1.task);

      simulateAsyncOperation("두 번째 작업", 800, (result2) => {
        console.log("2단계 완료:", result2.task);
        console.log("모든 작업 완료!");
      });
    });
  },

  // 예제 7: 함수형 프로그래밍 패턴
  exampleSeven: () => {
    console.log("=== 예제 7: 함수형 프로그래밍 패턴 ===");

    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    // 체이닝 패턴
    const processedNumbers = numbers
      .filter((num) => {
        return num % 2 === 0;
      })
      .map((num) => {
        return num * 2;
      })
      .reduce((acc, num) => {
        return acc + num;
      }, 0);

    console.log("원본 배열:", numbers);
    console.log("처리된 결과:", processedNumbers);

    // 커링 패턴
    const createMultiplier = (factor) => {
      return (value) => {
        return value * factor;
      };
    };

    const double = createMultiplier(2);
    const triple = createMultiplier(3);

    console.log("2배 함수:", numbers.map(double));
    console.log("3배 함수:", numbers.map(triple));

    // 조합 함수
    const compose = (f, g) => {
      return (x) => {
        return f(g(x));
      };
    };

    const addOne = (x) => {
      return x + 1;
    };

    const multiplyByTwo = (x) => {
      return x * 2;
    };

    const composedFunction = compose(multiplyByTwo, addOne);
    console.log("함수 조합 결과:", numbers.map(composedFunction));
  },

  // 예제 8: 에러 처리와 검증
  exampleEight: () => {
    console.log("=== 예제 8: 에러 처리와 검증 ===");

    const validator = {
      validateAge: function (age) {
        try {
          if (typeof age !== "number") {
            throw new Error("나이는 숫자여야 합니다.");
          }

          if (age < 0) {
            throw new Error("나이는 0 이상이어야 합니다.");
          }

          if (age > 150) {
            throw new Error("유효하지 않은 나이입니다.");
          }

          return {
            valid: true,
            message: "유효한 나이입니다.",
          };
        } catch (error) {
          return {
            valid: false,
            message: error.message,
          };
        }
      },

      validateUser: function (userData) {
        const errors = [];

        if (!userData.name || userData.name.trim() === "") {
          errors.push("이름이 필요합니다.");
        }

        if (!userData.email || !userData.email.includes("@")) {
          errors.push("유효한 이메일이 필요합니다.");
        }

        const ageValidation = this.validateAge(userData.age);
        if (!ageValidation.valid) {
          errors.push(ageValidation.message);
        }

        return {
          valid: errors.length === 0,
          errors: errors,
        };
      },
    };

    // 테스트 데이터
    const testUsers = [
      { name: "김철수", email: "kim@example.com", age: 25 },
      { name: "", email: "invalid-email", age: -5 },
      { name: "박영희", email: "park@test.com", age: 30 },
    ];

    testUsers.forEach((user, index) => {
      console.log(`사용자 ${index + 1} 검증:`, validator.validateUser(user));
    });
  },

  // 예제 9: 모듈 패턴과 네임스페이스
  exampleNine: () => {
    console.log("=== 예제 9: 모듈 패턴 ===");

    const MathModule = (function () {
      let privateCounter = 0;

      const privateFunction = () => {
        privateCounter = privateCounter + 1;
        return privateCounter;
      };

      return {
        add: function (a, b) {
          const callCount = privateFunction();
          console.log(`add 함수 호출 횟수: ${callCount}`);
          return a + b;
        },

        multiply: function (a, b) {
          const callCount = privateFunction();
          console.log(`multiply 함수 호출 횟수: ${callCount}`);
          return a * b;
        },

        getCallCount: function () {
          return privateCounter;
        },
      };
    })();

    console.log("덧셈:", MathModule.add(5, 3));
    console.log("곱셈:", MathModule.multiply(4, 7));
    console.log("총 호출 횟수:", MathModule.getCallCount());

    // 팩토리 패턴
    const createCounter = (initialValue) => {
      let count = initialValue || 0;

      return {
        increment: () => {
          count = count + 1;
          return count;
        },
        decrement: () => {
          count = count - 1;
          return count;
        },
        getValue: () => {
          return count;
        },
        reset: () => {
          count = initialValue || 0;
          return count;
        },
      };
    };

    const counter1 = createCounter(10);
    const counter2 = createCounter(0);

    console.log("카운터1 증가:", counter1.increment());
    console.log("카운터2 증가:", counter2.increment());
    console.log("카운터1 현재값:", counter1.getValue());
    console.log("카운터2 현재값:", counter2.getValue());
  },

  // 예제 10: 종합 응용 - 간단한 할일 관리자
  exampleTen: () => {
    console.log("=== 예제 10: 할일 관리자 ===");

    const TodoManager = {
      todos: [],
      nextId: 1,

      addTodo: function (text, priority) {
        if (!text || text.trim() === "") {
          console.log("할일 내용이 필요합니다.");
          return false;
        }

        const todo = {
          id: this.nextId,
          text: text.trim(),
          priority: priority || "보통",
          completed: false,
          createdAt: new Date().toLocaleString(),
        };

        this.todos.push(todo);
        this.nextId = this.nextId + 1;
        console.log("할일 추가됨:", todo);
        return true;
      },

      completeTodo: function (id) {
        const todo = this.todos.find((item) => {
          return item.id === id;
        });

        if (todo) {
          todo.completed = true;
          todo.completedAt = new Date().toLocaleString();
          console.log("할일 완료:", todo);
          return true;
        } else {
          console.log("해당 ID의 할일을 찾을 수 없습니다.");
          return false;
        }
      },

      removeTodo: function (id) {
        const index = this.todos.findIndex((item) => {
          return item.id === id;
        });

        if (index !== -1) {
          const removed = this.todos.splice(index, 1)[0];
          console.log("할일 제거됨:", removed);
          return true;
        } else {
          console.log("해당 ID의 할일을 찾을 수 없습니다.");
          return false;
        }
      },

      listTodos: function (filter) {
        let filteredTodos = this.todos;

        if (filter === "completed") {
          filteredTodos = this.todos.filter((todo) => {
            return todo.completed === true;
          });
        } else if (filter === "pending") {
          filteredTodos = this.todos.filter((todo) => {
            return todo.completed === false;
          });
        }

        console.log(`할일 목록 (${filter || "전체"}):`);
        filteredTodos.forEach((todo) => {
          const status = todo.completed ? "✓" : "○";
          console.log(`${status} [${todo.id}] ${todo.text} (${todo.priority})`);
        });

        return filteredTodos;
      },

      getStats: function () {
        const total = this.todos.length;
        const completed = this.todos.filter((todo) => {
          return todo.completed === true;
        }).length;
        const pending = total - completed;

        const stats = {
          total: total,
          completed: completed,
          pending: pending,
          completionRate: total > 0 ? Math.round((completed / total) * 100) : 0,
        };

        console.log("할일 통계:", stats);
        return stats;
      },
    };

    // 샘플 데이터로 테스트
    TodoManager.addTodo("JavaScript 공부하기", "높음");
    TodoManager.addTodo("운동하기", "보통");
    TodoManager.addTodo("독서하기", "낮음");

    TodoManager.listTodos();
    TodoManager.completeTodo(1);
    TodoManager.listTodos("completed");
    TodoManager.listTodos("pending");
    TodoManager.getStats();
  },

  // 모든 예제 실행
  runAll: () => {
    console.log("=== 모든 CLI 예제 실행 ===");
    Object.keys(practice).forEach((key) => {
      if (key !== "runAll" && typeof practice[key] === "function") {
        practice[key]();
        console.log(""); // 빈 줄 추가
      }
    });
  },
};

// 사용법 안내
// console.log("JavaScript CLI 연습 예제가 로드되었습니다!");
// console.log("사용법:");
// console.log("practice.exampleOne() ~ practice.exampleTen() - 개별 예제 실행");
practice.runAll();
// console.log("practice.runAll() - 모든 예제 한번에 실행");

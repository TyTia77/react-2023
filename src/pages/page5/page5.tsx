import React, { useEffect } from "react";
import { useThrottle } from "hooks";

interface IPage5Props {
  children?: React.ReactNode;
}

function Page5(props: IPage5Props) {
  const { children } = props;

  let test: unknown = 3;

  test = 2 + "string";

  console.log(test);

  interface Sorta<S> {
    item: S;
    sorter: number;
  }

  function sorter<T>(items: T[], sort: (s: T) => number): T[] {
    const rank: Sorta<T>[] = items.map((item) => ({
      item,
      sorter: sort(item),
    }));

    rank.sort((a, b) => a.sorter - b.sorter);

    return rank.map((r) => r.item);
  }

  interface Person {
    name: string;
    age: number;
  }

  const person: Person[] = [
    {
      name: "john",
      age: 20,
    },
    {
      name: "jane",
      age: 30,
    },
    {
      name: "doe",
      age: 25,
    },
  ];

  console.log(sorter(person, ({ age }) => age));

  const t = [20, 30, 40, 50, 60];

  const tt = t.map(ttt);

  console.log(tt);

  function ttt(t: number, i: number) {
    return t * i;
  }

  // for (let n of range(0,100,20)) {
  //   console.log(n);
  // }

  const test1 = {
    name: "ty",
    age: 38,
  };

  function testfn(this: any, o: any, z: any) {
    console.log({ o, z });
    console.log(`hi my name is ${this.name} and i am ${this.age} yrs ${o}`);
  }

  const mybind = testfn.mybind(test1, "yo", "mama");

  mybind("to");

  const sum = (a: number) => {
    return (b: number) => {
      if (b) return sum(a + b);
      return a;
    };
  };

  //@ts-ignore
  const ans = sum(3)(4)(3)();

  console.log(ans);




  const throttledCB = useThrottle(() => {
    console.log("throttle");
  }, 5000);


  useEffect(() => {
    // Setup the effect (e.g., add event listener, start a timer)
    console.log("Effect is running");
    const timerId = setInterval(() => {
      // ...
      // console.log('intervaling');
      throttledCB()
    }, 200);

    // Return a cleanup function
    return () => {
      console.log("Effect cleanup is running");
      clearInterval(timerId); // Clean up the effect
    };
  }, []);

  return <div>Page5</div>;
}

export default Page5;

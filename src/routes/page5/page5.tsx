import React from "react";

interface IPage5Props {
  children?: React.ReactNode;
}

export function Page5(props: IPage5Props) {
  const { children } = props;

  let test: unknown = 3

  test = 2 + 'string'


  console.log(test)

  interface Sorta<S> {
    item: S;
    sorter: number;
  }

  function sorter<T>(
    items: T[],
    sort: (s: T) => number
  ): T[] {

    const rank: Sorta<T>[] = items.map((item) => ({
        item,
        sorter: sort(item)
    }))

    rank.sort((a,b) => a.sorter - b.sorter)

    return rank.map((r) => (r.item))
  }

  interface Person {
    name: string,
    age: number,
  }

  const person: Person[] = [
    {
        name: 'john',
        age: 20
    },
    {
        name: 'jane',
        age: 30
    },
    {
        name: 'doe',
        age: 25
    }
  ]

  console.log(sorter(person, ({age}) => age))

  return <div>Page5</div>;
}

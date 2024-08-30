# [1] useForm구현해보기

## I. key에 따라 useForm의 data에 등록해보기

```tsx
["a", 0, "b"]
{
  "a": [{ "b": "" }]
}
```

--> a는 array다. (다음 요소가 숫자)
--> a의 0번째 요소는 b를 키로 가지고 있는 객체다.

```tsx
["a", 1, "c"] //--> a[1].c = ""
{
  "a": [{...}, {"c" : ""}]
}

["a", 0, "b", 0, "d"] //--> a[0].b[0].d = ""
{
  "a": [{"b": [{"d":""}]}, {...}]
}
```

--> b는 array다. (다음 요소가 숫자)
--> a의 0번째 중 b의 0 요소는 d를 키로 가지고 있는 객체다.

```tsx
["a", 0, "b", 1, "e"];
```

--> arr.a[0].b[1].e = ""
--> 만약 arr가 빈 객체라면?

```tsx
if (!arr?.a) arr.a = [{}]; // arr= {a: [{}]}
if (!arr.a[0]?.b) arr.a[0].b = []; // arr = {a: [{}]}
```

arr.a[0].b[1]를 만들고 arr.a[0].b[1].e를 만들어서 ""를 할당

```tsx
{
  "a": [{"b": [{...}, {e: ""}]}, {...}]
  //console.log(data['a'][0]['b'][1]['e'])

}
```

```tsx
if (isThereFormArray) {
  //다음 요소keys가 숫자일때 array로...
  //1) data에 key가 등록되어있는 경우
  //2) 등록되어있지 않은 경우

  const mutatedData = { ...data };
  //복사

  for (let i = 0; i < keys.length; i++) {
    const arrayCount = parseInt(keys[i + 1]) + 1;
    const isArray = !isNaN(arrayCount);
    //다음 요소가 숫자일때 해당 키의 값은 array
    if (isArray) {
      mutatedData[keys[i]] = [];
      for (let i = 0; i < arrayCount; i++) {
        mutatedData[keys[i]].push({});
      }
      return; //{ a: []}
    }
    return (mutatedData[keys[i]] = {}); //{a: []}
  }

  setData(mutatedData);
}
```

## II. register함수가 return하는 값

```tsx
return {
  onChange: (e: HTMLInputElement) => {
    //해당 array에 값을 등록해야함
  },
  name: registeredName,
};
```

### 1.onChange

onChange는 등록한 key를 이용해서  
onChange이벤트가 발생할 때마다  
해당 value를 설정해줌.

a.0.b.1.e 가 key인 경우
숫자라면 [0]으로 설정해야 함

```tsx
data["a"][0]["b"][1]["e"];
const targetKey = keys.reduce((acc, cur) => {
  if (!isNaN(Number(cur))) return acc[Number(cur)];
  return acc[cur];
}, data);
```

### 2.name

1에서 설정한 poppedKey return (마지막 key값)

# [2] useFieldArray 구현해보기

출처 : react-hook-form공식문서

```tsx
function FieldArray() {
  const { control, register } = useForm();
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormProvider)
    name: "test", // unique name for your Field Array
  });

  return (
    {fields.map((field, index) => (
      <input
        key={field.id} // important to include key with field's id
        {...register(`test.${index}.value`)}
      />
    ))}
  );
}
```

fields는 nested될 수 있음


출처 : chatgpt
```tsx
function NestedArray({ nestIndex, control, register }) {
  const { fields: innerFields, append: appendInner } = useFieldArray({
    control,
    name: `outerArray.${nestIndex}.innerArray`,
  });

  return (
    <div>
      {innerFields.map((innerField, innerIndex) => (
        <div key={innerField.id} style={{ marginLeft: 20 }}>
          <input
            {...register(
              `outerArray.${nestIndex}.innerArray.${innerIndex}.value`
            )}
            placeholder="Inner Value"
          />
          <button type="button" onClick={() => appendInner({ value: "" })}>
            Add Inner
          </button>
        </div>
      ))}
    </div>
  );
}
```

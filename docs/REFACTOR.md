1. useFormArray 구현
  - 리팩터링 하고 싶은 이유
  반복되는 구조와 로직을 (map, add, delete, handleSubmit) 추상화하여 재사용성을 높여주고
  관심사 분리를 통해 파악하기 쉬운 코드로 유지보수성을 높여본다.

  - 사용시 예상되는 이점
    form의 구조대로 폼을 렌더링
    formField에 등록하면 map으로 반복되는 form을 렌더링
    handleFormAdd 함수를 활용해 반복되는 form을 추가
    handleFormDelete으로 반복되는 form 삭제
    수정시 데이터 수정
    제출시 데이터 제출

  구현 필요 사항
  - [ ] form의 구조를 등록한다. 
      - 등록할 구조 예상 : 
        1) [{element: input, type: 'text', name: 'formTitle'}] (x)
        2) react-hook-form을 모방한 register방식
        ```tsx 
        const {register} = useForm();
        const {fields} = useFieldArray({
          name : 'forms'
        })
        const submitFn = (data) => {
          console.log(data)
        }

        return ( 
          <form onSubmit={handleSubmit(submitFn)}>
            <input {...register("formTitle")} />
            {fields.map((field, index) => (
              <input
                key={field.id}
                {...register(`forms.${index}.value`)}
              />
            ))}
          </form>
        )
        ```

      -  예상해보는 내부로직 :
      ```tsx
        const useForm = (id) => {
          //register 호출 시 state에 등록
          const [formState, setFormState] = useState([]);
          const onChange = () => {
            
          }
          const handleSubmit = (submitFn) =>{
            //useForm에 등록된 상태들을 객체로 넣어서 실행
          }
          return {onChange, onBlur, name, handleSubmit }
        }
      ```


  - 등록된 구조대로 폼을 렌더링 할 수 있게 한다.
      - 이게 과연 좋은 구조일지? 고민 중
      - 전체의 구조를 담은 객체형태에서 element로 렌더링되는 것은 코드를 경직되게 만드는 것 같음
      - 일례로 react-hook-form은 등록을 register로 개별 엘리먼트에 등록하게 만듦.
      - 소프트웨어 특성상 유연한 구조를 필요로 하므로 이 방식을 차용하지 않는 것이 좋을 것 같다.
        
  - [ ] handleFormAdd로 엘리먼트를 추가할 수 있게 한다.
  - [ ] handleFormDelete로 엘리먼트를 삭제할 수 있게 한다.
  - [ ] 초기 선언 시 type이 blur일 때 상태를 onBlur 이벤트시 업데이트 할 수 있도록
  - [ ] submit일 때 데이터를 제출할 수 있도록

2. 가독성을 위한 수정
  - type을 각 파일 상단에 

3. 테스트 하기 좋은 코드의 관점으로 큰 틀에서 말고 리팩토링 해보기


## 피드백 관련 리팩토링

4. typescript의 다양한 타입을 활용해본다. 
  - 사용시 예상되는 이점
    반복되는 타입을 발견하여 추상화 하는 것에 도움을 받을 수 있다.
    상속 구조로 타입 설정시에도 에러를 방지할 수 있다.
  - 구현 필요 사항


5. react-query를 모방한 api 요청 로직
  - 사용시 예상되는 이점 

  - 구현 필요 사항

6. 가독성을 위한 변수 및 파일 명 수정
import { describe, expect, test } from "vitest";
import { useForm } from "./useForm";
import { FormContext, FormProvider } from "./formContext";
import { useContext, useEffect } from "react";
import { act, render, renderHook, waitFor } from "@testing-library/react";

describe("key로 등록하게 되면 해당 key가 hook-form 데이터에 등록되는지", () => {
  const wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <FormProvider>{children}</FormProvider>
  );
  const { result: resultContext } = renderHook(() => useContext(FormContext));

  test("key를 등록하면 특정 프로퍼티가 존재하는지", async () => {
    const { result } = renderHook(() => useForm({ test: "" }), { wrapper });

    const registerVal = result.current.register("test");

    expect(registerVal).toHaveProperty("onChange");
    expect(registerVal).toHaveProperty("name");
    expect(registerVal).toHaveProperty("value");
  });

  test("key로 등록하게 되면 해당 key가 hook-form 데이터에 등록되는지", async () => {
    const { result } = renderHook(
      () => {
        const form = useForm({ test: "" });
        const context = useContext(FormContext);
        return { form, context };
      },
      { wrapper }
    );

    expect(result.current.context.data).toBeDefined();
    expect(result.current.context.data).toHaveProperty("test");
    expect(result.current.context.data.test).toBe("");
  });

  test("중첩된 키가 잘 등록이 되는가", async () => {
    const { result } = renderHook(
      () => {
        const form = useForm({ test: [{ nestedValue: "" }] });
        const context = useContext(FormContext);

        useEffect(() => {
          form.register("test.0.nestedValue");
        }, []);

        return { form, context };
      },
      { wrapper }
    );

    await waitFor(() => {
      expect(result.current.context.data).toBeDefined();
      // expect(result.current.context.data).toHaveProperty("test");
      expect(result.current.context.data.test[0]).toHaveProperty("nestedValue");
      // expect(result.current.context.data.test[0].nestedValue).toBe("");
    });
  });
});

/**
 * 1. 초깃값 설정 시 property 정상 존재 확인
 * 2. register에 key 설정시 해당 key 데이터에 존재 확인
 *
 * 중요한 로직이 무엇인가.
 * 중요한 로직을 신뢰할 수 있는가. (복잡한 것에 대해 )
 * 키를 넣고 리턴
 */

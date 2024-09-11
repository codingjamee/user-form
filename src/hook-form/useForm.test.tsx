import { describe, expect, test } from "vitest";
import { useForm } from "./useForm";
import { FormContext, FormProvider } from "./formContext";
import { useContext } from "react";
import { act, render, renderHook } from "@testing-library/react";

describe("key로 등록하게 되면 해당 key가 hook-form 데이터에 등록되는지", () => {
  const wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <FormProvider>{children}</FormProvider>
  );
  const { result: resultContext } = renderHook(() => useContext(FormContext));

  test("key를 등록하면 특정 프로퍼티가 존재하는지", async () => {
    const { result } = renderHook(
      () => useForm({ defaultValues: { test: "" } }),
      { wrapper }
    );

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    const registerVal = result.current.register("test");

    expect(registerVal).toHaveProperty("onChange");
    expect(registerVal).toHaveProperty("name");
    expect(registerVal).toHaveProperty("value");
  });

  test("key로 등록하게 되면 해당 key가 hook-form 데이터에 등록되는지", async () => {
    const { result: formResult } = renderHook(() => useForm({ test: "" }), {
      wrapper,
    });

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    const { result: contextResult } = renderHook(
      () => useContext(FormContext),
      { wrapper }
    );

    expect(contextResult.current.data).toBeDefined();

    expect(contextResult.current.data).toHaveProperty("test");
    expect(contextResult.current.data.test).toBe("");
  });
});

/**
 * 1. 초깃값 설정 시 property 정상 존재 확인
 * 2. register에 key 설정시 해당 key 데이터에 존재 확인
 */

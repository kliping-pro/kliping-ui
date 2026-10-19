import { effectScope, nextTick, reactive } from 'vue'
import { describe, expect, it, vi } from 'vitest'
import { useControllableValue } from './use-controllable-value'

function runInScope<T>(fn: () => T) {
  const scope = effectScope()
  const result = scope.run(fn) as T
  return { result, scope }
}

describe('useControllableValue', () => {
  it('uncontrolled: manages its own value', () => {
    const props = reactive<Record<string, any>>({ defaultValue: 'a' })
    const { result, scope } = runInScope(() => useControllableValue<string>(props))

    expect(result.state.value).toBe('a')
    result.setState('b')
    expect(result.state.value).toBe('b')

    scope.stop()
  })

  it('uncontrolled: falls back to defaultValue from options', () => {
    const props = reactive<Record<string, any>>({})
    const { result, scope } = runInScope(() =>
      useControllableValue<string>(props, { defaultValue: 'fallback' }),
    )

    expect(result.state.value).toBe('fallback')
    scope.stop()
  })

  // Saat terkendali, yang berhak mengubah nilainya adalah induknya. Menulis ke
  // state sendiri akan membuat tampilannya menyimpang dari sumber kebenarannya.
  it('controlled: setState does not change its own value', () => {
    const onChange = vi.fn()
    const props = reactive<Record<string, any>>({ value: 'a', onChange })
    const { result, scope } = runInScope(() => useControllableValue<string>(props))

    expect(result.state.value).toBe('a')
    result.setState('b')

    expect(result.state.value).toBe('a')
    expect(onChange).toHaveBeenCalledWith('b')

    scope.stop()
  })

  it('controlled: follows the parent when it changes the prop', async () => {
    const props = reactive<Record<string, any>>({ value: 'a' })
    const { result, scope } = runInScope(() => useControllableValue<string>(props))

    props.value = 'b'
    await nextTick()
    expect(result.state.value).toBe('b')

    scope.stop()
  })

  it('notifies through trigger in both modes', () => {
    const onChange = vi.fn()
    const props = reactive<Record<string, any>>({ defaultValue: 1, onChange })
    const { result, scope } = runInScope(() => useControllableValue<number>(props))

    result.setState(2)
    expect(onChange).toHaveBeenCalledWith(2)
    expect(result.state.value).toBe(2)

    scope.stop()
  })

  it('setState accepts an updater that reads the current value', () => {
    const props = reactive<Record<string, any>>({ defaultValue: 10 })
    const { result, scope } = runInScope(() => useControllableValue<number>(props))

    result.setState(current => current + 5)
    expect(result.state.value).toBe(15)

    scope.stop()
  })

  it('forwards extra arguments to trigger', () => {
    const onChange = vi.fn()
    const props = reactive<Record<string, any>>({ defaultValue: 'a', onChange })
    const { result, scope } = runInScope(() => useControllableValue<string>(props))

    result.setState('b', { reason: 'click' })
    expect(onChange).toHaveBeenCalledWith('b', { reason: 'click' })

    scope.stop()
  })

  it('prop names can be changed through options', () => {
    const onUpdate = vi.fn()
    const props = reactive<Record<string, any>>({ open: true, onUpdate })
    const { result, scope } = runInScope(() =>
      useControllableValue<boolean>(props, {
        valuePropName: 'open',
        defaultValuePropName: 'defaultOpen',
        trigger: 'onUpdate',
      }),
    )

    expect(result.state.value).toBe(true)
    result.setState(false)
    expect(onUpdate).toHaveBeenCalledWith(false)

    scope.stop()
  })

  // Objek props Vue SELALU memuat semua kunci yang dideklarasikan — yang tidak
  // dikirim bernilai undefined. Karena itu penandanya `!== undefined`, bukan
  // memeriksa ada tidaknya kuncinya: memeriksa keberadaan kunci akan membuat
  // setiap komponen dikira terkendali. Ini uji yang menjaganya.
  it('a prop set to undefined counts as uncontrolled', () => {
    const props = reactive<Record<string, any>>({ value: undefined, defaultValue: 'a' })
    const { result, scope } = runInScope(() => useControllableValue<string>(props))

    expect(result.state.value).toBe('a')
    result.setState('b')
    expect(result.state.value).toBe('b')

    scope.stop()
  })

  it('can switch to controlled midway', async () => {
    const props = reactive<Record<string, any>>({ value: undefined, defaultValue: 'a' })
    const { result, scope } = runInScope(() => useControllableValue<string>(props))

    result.setState('b')
    expect(result.state.value).toBe('b')

    props.value = 'from-parent'
    await nextTick()
    expect(result.state.value).toBe('from-parent')

    scope.stop()
  })
})

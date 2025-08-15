import React, { useRef, useImperativeHandle, forwardRef, useState } from 'react';

// 1. Базовое использование useImperativeHandle
interface InputRef {
  focus: () => void;
  blur: () => void;
  select: () => void;
  getValue: () => string;
  setValue: (value: string) => void;
}

const CustomInput = forwardRef<InputRef, { placeholder?: string }>((props, ref) => {
  const [value, setValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current?.focus();
    },
    blur: () => {
      inputRef.current?.blur();
    },
    select: () => {
      inputRef.current?.select();
    },
    getValue: () => {
      return value;
    },
    setValue: (newValue: string) => {
      setValue(newValue);
    }
  }), [value]);

  return (
    <input
      ref={inputRef}
      type="text"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder={props.placeholder}
      className="border p-2 rounded w-full"
    />
  );
});

const BasicUseImperativeHandle: React.FC = () => {
  const inputRef = useRef<InputRef>(null);

  const handleFocus = () => {
    inputRef.current?.focus();
  };

  const handleBlur = () => {
    inputRef.current?.blur();
  };

  const handleSelect = () => {
    inputRef.current?.select();
  };

  const handleGetValue = () => {
    const value = inputRef.current?.getValue();
    alert(`Значение: ${value}`);
  };

  const handleSetValue = () => {
    inputRef.current?.setValue('Новое значение');
  };

  return (
    <div className="p-4 border rounded">
      <h3 className="text-lg font-bold mb-4">Базовое использование useImperativeHandle</h3>
      
      <div className="mb-4">
        <CustomInput ref={inputRef} placeholder="Введите текст" />
      </div>

      <div className="space-x-2">
        <button 
          onClick={handleFocus}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Фокус
        </button>
        <button 
          onClick={handleBlur}
          className="bg-gray-500 text-white px-4 py-2 rounded"
        >
          Убрать фокус
        </button>
        <button 
          onClick={handleSelect}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Выделить текст
        </button>
        <button 
          onClick={handleGetValue}
          className="bg-purple-500 text-white px-4 py-2 rounded"
        >
          Получить значение
        </button>
        <button 
          onClick={handleSetValue}
          className="bg-orange-500 text-white px-4 py-2 rounded"
        >
          Установить значение
        </button>
      </div>
    </div>
  );
};

// 2. useImperativeHandle для модального окна
interface ModalRef {
  open: () => void;
  close: () => void;
  isOpen: () => boolean;
}

const Modal = forwardRef<ModalRef, { title: string; children: React.ReactNode }>((props, ref) => {
  const [isOpen, setIsOpen] = useState(false);

  useImperativeHandle(ref, () => ({
    open: () => {
      setIsOpen(true);
    },
    close: () => {
      setIsOpen(false);
    },
    isOpen: () => {
      return isOpen;
    }
  }), [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold">{props.title}</h3>
          <button 
            onClick={() => setIsOpen(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
        <div className="mb-4">
          {props.children}
        </div>
        <div className="flex justify-end space-x-2">
          <button 
            onClick={() => setIsOpen(false)}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Отмена
          </button>
          <button 
            onClick={() => setIsOpen(false)}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            ОК
          </button>
        </div>
      </div>
    </div>
  );
});

const ModalExample: React.FC = () => {
  const modalRef = useRef<ModalRef>(null);

  const openModal = () => {
    modalRef.current?.open();
  };

  const closeModal = () => {
    modalRef.current?.close();
  };

  const checkModalStatus = () => {
    const isOpen = modalRef.current?.isOpen();
    alert(`Модальное окно ${isOpen ? 'открыто' : 'закрыто'}`);
  };

  return (
    <div className="p-4 border rounded mt-4">
      <h3 className="text-lg font-bold mb-4">useImperativeHandle для модального окна</h3>
      
      <div className="space-x-2 mb-4">
        <button 
          onClick={openModal}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Открыть модальное окно
        </button>
        <button 
          onClick={closeModal}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Закрыть модальное окно
        </button>
        <button 
          onClick={checkModalStatus}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Проверить статус
        </button>
      </div>

      <Modal ref={modalRef} title="Пример модального окна">
        <p>Это содержимое модального окна, которое можно контролировать извне.</p>
      </Modal>
    </div>
  );
};

// 3. useImperativeHandle для видео плеера
interface VideoPlayerRef {
  play: () => void;
  pause: () => void;
  seek: (time: number) => void;
  getCurrentTime: () => number;
  getDuration: () => number;
  setVolume: (volume: number) => void;
}

const VideoPlayer = forwardRef<VideoPlayerRef, { src: string }>((props, ref) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useImperativeHandle(ref, () => ({
    play: () => {
      videoRef.current?.play();
    },
    pause: () => {
      videoRef.current?.pause();
    },
    seek: (time: number) => {
      if (videoRef.current) {
        videoRef.current.currentTime = time;
      }
    },
    getCurrentTime: () => {
      return videoRef.current?.currentTime || 0;
    },
    getDuration: () => {
      return videoRef.current?.duration || 0;
    },
    setVolume: (volume: number) => {
      if (videoRef.current) {
        videoRef.current.volume = Math.max(0, Math.min(1, volume));
      }
    }
  }), []);

  return (
    <video
      ref={videoRef}
      src={props.src}
      controls
      className="w-full max-w-md rounded"
    />
  );
});

const VideoPlayerExample: React.FC = () => {
  const playerRef = useRef<VideoPlayerRef>(null);

  const handlePlay = () => {
    playerRef.current?.play();
  };

  const handlePause = () => {
    playerRef.current?.pause();
  };

  const handleSeek = () => {
    playerRef.current?.seek(30); // Перейти к 30 секунде
  };

  const handleGetTime = () => {
    const currentTime = playerRef.current?.getCurrentTime();
    const duration = playerRef.current?.getDuration();
    alert(`Текущее время: ${currentTime?.toFixed(1)}s / ${duration?.toFixed(1)}s`);
  };

  const handleSetVolume = () => {
    playerRef.current?.setVolume(0.5); // Установить громкость 50%
  };

  return (
    <div className="p-4 border rounded mt-4">
      <h3 className="text-lg font-bold mb-4">useImperativeHandle для видео плеера</h3>
      
      <div className="mb-4">
        <VideoPlayer 
          ref={playerRef} 
          src="https://www.w3schools.com/html/mov_bbb.mp4" 
        />
      </div>

      <div className="space-x-2">
        <button 
          onClick={handlePlay}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Воспроизвести
        </button>
        <button 
          onClick={handlePause}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Пауза
        </button>
        <button 
          onClick={handleSeek}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Перейти к 30с
        </button>
        <button 
          onClick={handleGetTime}
          className="bg-purple-500 text-white px-4 py-2 rounded"
        >
          Получить время
        </button>
        <button 
          onClick={handleSetVolume}
          className="bg-orange-500 text-white px-4 py-2 rounded"
        >
          Громкость 50%
        </button>
      </div>
    </div>
  );
};

// 4. useImperativeHandle с зависимостями
interface CounterRef {
  increment: () => void;
  decrement: () => void;
  reset: () => void;
  getValue: () => number;
  setValue: (value: number) => void;
}

const Counter = forwardRef<CounterRef, { initialValue?: number }>((props, ref) => {
  const [count, setCount] = useState(props.initialValue || 0);
  const [step, setStep] = useState(1);

  useImperativeHandle(ref, () => ({
    increment: () => {
      setCount(prev => prev + step);
    },
    decrement: () => {
      setCount(prev => prev - step);
    },
    reset: () => {
      setCount(props.initialValue || 0);
    },
    getValue: () => {
      return count;
    },
    setValue: (value: number) => {
      setCount(value);
    }
  }), [count, step, props.initialValue]); // Зависимости

  return (
    <div className="p-4 bg-gray-100 rounded">
      <h4 className="font-bold mb-2">Счетчик: {count}</h4>
      <div className="mb-2">
        <label className="block text-sm font-medium mb-1">Шаг:</label>
        <input
          type="number"
          value={step}
          onChange={(e) => setStep(parseInt(e.target.value) || 1)}
          min="1"
          className="border p-1 rounded w-20"
        />
      </div>
      <div className="space-x-2">
        <button 
          onClick={() => setCount(prev => prev + step)}
          className="bg-green-500 text-white px-3 py-1 rounded text-sm"
        >
          +
        </button>
        <button 
          onClick={() => setCount(prev => prev - step)}
          className="bg-red-500 text-white px-3 py-1 rounded text-sm"
        >
          -
        </button>
        <button 
          onClick={() => setCount(props.initialValue || 0)}
          className="bg-gray-500 text-white px-3 py-1 rounded text-sm"
        >
          Сброс
        </button>
      </div>
    </div>
  );
});

const CounterExample: React.FC = () => {
  const counterRef = useRef<CounterRef>(null);

  const handleIncrement = () => {
    counterRef.current?.increment();
  };

  const handleDecrement = () => {
    counterRef.current?.decrement();
  };

  const handleReset = () => {
    counterRef.current?.reset();
  };

  const handleGetValue = () => {
    const value = counterRef.current?.getValue();
    alert(`Значение счетчика: ${value}`);
  };

  const handleSetValue = () => {
    counterRef.current?.setValue(100);
  };

  return (
    <div className="p-4 border rounded mt-4">
      <h3 className="text-lg font-bold mb-4">useImperativeHandle с зависимостями</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h4 className="font-bold mb-2">Контроль извне:</h4>
          <div className="space-y-2">
            <button 
              onClick={handleIncrement}
              className="bg-green-500 text-white px-4 py-2 rounded w-full"
            >
              Увеличить
            </button>
            <button 
              onClick={handleDecrement}
              className="bg-red-500 text-white px-4 py-2 rounded w-full"
            >
              Уменьшить
            </button>
            <button 
              onClick={handleReset}
              className="bg-gray-500 text-white px-4 py-2 rounded w-full"
            >
              Сброс
            </button>
            <button 
              onClick={handleGetValue}
              className="bg-purple-500 text-white px-4 py-2 rounded w-full"
            >
              Получить значение
            </button>
            <button 
              onClick={handleSetValue}
              className="bg-orange-500 text-white px-4 py-2 rounded w-full"
            >
              Установить 100
            </button>
          </div>
        </div>
        <div>
          <h4 className="font-bold mb-2">Компонент счетчика:</h4>
          <Counter ref={counterRef} initialValue={0} />
        </div>
      </div>
    </div>
  );
};

// 5. Когда НЕ использовать useImperativeHandle
const WhenNotToUseImperativeHandle: React.FC = () => {
  return (
    <div className="p-4 border rounded mt-4">
      <h3 className="text-lg font-bold mb-4">Когда НЕ использовать useImperativeHandle</h3>
      
      <div className="space-y-4">
        <div className="p-3 bg-red-50 rounded">
          <h4 className="font-bold text-red-800 mb-2">❌ Не используйте для:</h4>
          <ul className="list-disc list-inside text-sm text-red-700 space-y-1">
            <li>Простых компонентов без сложной логики</li>
            <li>Когда можно обойтись props и callbacks</li>
            <li>Для передачи данных вверх по дереву (используйте state lifting)</li>
            <li>Когда нарушается принцип однонаправленного потока данных</li>
            <li>Для замены правильной архитектуры компонентов</li>
          </ul>
        </div>

        <div className="p-3 bg-green-50 rounded">
          <h4 className="font-bold text-green-800 mb-2">✅ Используйте для:</h4>
          <ul className="list-disc list-inside text-sm text-green-700 space-y-1">
            <li>Фокуса, выделения текста, прокрутки</li>
            <li>Управления медиа (видео, аудио)</li>
            <li>Анимаций и переходов</li>
            <li>Интеграции с DOM API</li>
            <li>Создания библиотечных компонентов</li>
          </ul>
        </div>

        <div className="p-3 bg-yellow-50 rounded">
          <h4 className="font-bold text-yellow-800 mb-2">⚠️ Помните:</h4>
          <ul className="list-disc list-inside text-sm text-yellow-700 space-y-1">
            <li>useImperativeHandle нарушает инкапсуляцию компонента</li>
            <li>Усложняет тестирование и отладку</li>
            <li>Может создать проблемы с производительностью</li>
            <li>Используйте только когда это действительно необходимо</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

// Основной компонент
const UseImperativeHandlePractice: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Практика useImperativeHandle</h1>
      
      <div className="space-y-6">
        <BasicUseImperativeHandle />
        <ModalExample />
        <VideoPlayerExample />
        <CounterExample />
        <WhenNotToUseImperativeHandle />
      </div>

      <div className="mt-8 p-4 bg-blue-50 rounded">
        <h2 className="text-xl font-bold mb-2">Ключевые моменты useImperativeHandle:</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>useImperativeHandle позволяет настроить значение, которое передается родительскому компоненту</li>
          <li>Используется вместе с forwardRef для создания императивного API</li>
          <li>Позволяет родительскому компоненту вызывать методы дочернего</li>
          <li>Принимает массив зависимостей как третий параметр</li>
          <li>Нарушает принцип однонаправленного потока данных</li>
          <li>Используйте только когда это действительно необходимо</li>
          <li>Подходит для интеграции с DOM API и сторонними библиотеками</li>
        </ul>
      </div>
    </div>
  );
};

export default UseImperativeHandlePractice; 
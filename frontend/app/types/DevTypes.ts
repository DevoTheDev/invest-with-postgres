/**
   * A utility type that augments an object type with a log method for debugging in development mode.
   * @template T The type of the props object.
   */
  export type DevProps<T extends object> = T & {
    log: <K extends keyof T>(key: K, value: T[K]) => void;
  };
  
  /**
   * A utility class that logs the values of all keys in a props object in development mode.
   * @template T The type of the props object.
   */
  export class DProps<T extends object> {
    private props: T | null;
  
    constructor(props: T | null) {
      this.props = props;
  
      // Log all prop values in development mode if props is valid
      if (process.env.NODE_ENV === "development" && this.props !== null && typeof this.props === "object") {
        this.logAllProps();
      }
    }
  
    /**
     * Logs the value of a specific key in the props object.
     * @param key The key to log.
     * @param value The value to log.
     */
    public log<K extends keyof T>(key: K, value: T[K]): void {
      if (process.env.NODE_ENV === "development") {
        try {
          console.log(`[DevProps] ${String(key)}:`, value);
        } catch (err) {
          console.warn(`[DevProps] Failed to log ${String(key)}:`, err);
        }
      }
    }
  
    /**
     * Logs all prop values in development mode.
     */
    private logAllProps(): void {
      if (!this.props) return;
  
      try {
        (Object.keys(this.props) as Array<keyof T>).forEach((key) => {
          const value = this.props![key];
          this.log(key, value);
        });
      } catch (err) {
        console.warn("[DevProps] Failed to log props:", err);
      }
    }
  
    /**
     * Gets the props object.
     * @returns The props object or null if not set.
     */
    public getProps(): T | null {
      return this.props;
    }
  }
  
  /**
   * A utility function that logs props with a custom label in development mode.
   * @template T The type of the props object.
   * @param label A label to identify the logging context.
   * @param props The props object to log.
   * @returns The DProps instance for further use.
   */
  export function Drops<T extends object>(label: string, props: T | null) {
    const drops = new DProps<T>(props);
    if (process.env.NODE_ENV === "development" && props !== null && typeof props === "object") {
      console.log(`- [ ${label} ] -`);
      console.log(`-`.padEnd(40, `-`));
      console.log(drops.getProps());

    }
    
  }
  
  /**
   * Example usage:
   * 
   * interface MyProps {
   *   name: string | null;
   *   age: number | null;
   *   active: boolean;
   * }
   * 
   * // Using DevProps type manually
   * const props: DevProps<MyProps> = {
   *   name: "Alice",
   *   age: null,
   *   active: true,
   *   log: (key, value) => {
   *     if (process.env.NODE_ENV === "development") {
   *       console.log(`[DevProps] ${String(key)}:`, value);
   *     }
   *   },
   * };
   * props.log("name", props.name); // Logs: [DevProps] name: Alice
   * 
   * // Using Drops function
   * const drops = Drops<MyProps>("UserProfile", { name: "Bob", age: 25, active: false });
   * // Logs in development mode:
   * // - [ UserProfile ] -
   * // ---------------------------------------
   * // [DevProps] name: Bob
   * // [DevProps] age: 25
   * // [DevProps] active: false
   * 
   * // Handle null props
   * const nullDrops = Drops<MyProps>("NullProfile", null);
   * // No logging occurs, returns DProps instance
   */
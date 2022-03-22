export interface IProps extends IPropsWithTestId, IPropsWithClassName, IPropsWithId {}

export interface IPropsWithTestId {
  /**
   * Test ID for use in test automation
   */
  "data-testid"?: string;
}

export interface IPropsWithClassName {
  /**
   * Custom class names for this component
   */
  className?: string;
}

export interface IPropsWithId {
  /**
   * The ID of the component
   */
  id?: string;
}

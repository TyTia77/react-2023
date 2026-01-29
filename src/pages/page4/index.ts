import { withState } from "components";
import { withFacade } from "./facade";
import { Page4 } from './page4'

export default withState(withFacade(Page4));
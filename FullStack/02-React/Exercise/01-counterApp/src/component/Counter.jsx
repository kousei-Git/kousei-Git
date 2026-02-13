import { useState } from 'react'
import './counter.css'

function Counter(){ 
    const [count,setCount] = useState(0)
    return(
        <>
        <div class="container">
            <div class="card">

                <div class="card-header">
                    <div class="dot-group">
                        <span class="dot dot-1"></span>
                        <span class="dot dot-2"></span>
                        <span class="dot dot-3"></span>
                    </div>
                    <p class="label">Counter</p>
                </div>

                <div class="counter-section">
                    <p class="helper-text">Current Value</p>
                    <div class="counter-display">{count}</div>
                    <div class="progress-bar">
                        <div class="progress-fill"></div>
                    </div>
                </div>

                <div class="button-group">
                    <button class="btn btn-decrement"
                        onClick={() => setCount(count - 1)}    
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"   stroke-width="2.5">
                            <line x1="5" y1="12" x2="19" y2="12"/>
                        </svg>
                    </button>

                    <button class="btn btn-reset"
                        onClick={() => setCount(0)}  
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"   stroke-width="2.5">
                            <path d="M1 4v6h6"/>
                            <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/>
                        </svg>
                    </button>

                    <button class="btn btn-increment"
                        onClick={() => setCount(count + 1)} 
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"   stroke-width="2.5">
                            <line x1="12" y1="5" x2="12" y2="19"/>
                            <line x1="5" y1="12" x2="19" y2="12"/>
                        </svg>
                    </button>
                </div>

            </div>
            <p class="footer">Crafted with care ✿</p>
        </div>
        </>
    )
}
export default Counter
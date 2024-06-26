import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { LucideLockKeyholeOpen, SquareUserRound } from "lucide-react";
import { useContext } from "react";
import { UserContext } from "./UserProvider";

export default function UserDropdown() {
  const { user } = useContext(UserContext);
  const auth = getAuth();

  return (  
    <div className="p-0">
      <div className="dropdown dropdown-end">
        <div tabIndex={0} role="button" className="btn btn-ghost">
          {auth.currentUser ? <LucideLockKeyholeOpen /> : <SquareUserRound height={35} width={35} />}
        </div>
        <ul
          tabIndex={0}
          className="p-2 shadow menu dropdown-content z-[1] min-w-52 rounded-box bg-white border"
        >
          <li>
            <span>{user ? "Admin-" + user.email : "Admin Login"}</span>
          </li>
          <li>
            <div>
              {user ? (
                <div
                  onClick={async () => {
                    await signOut(auth)
                      .then(() => {
                        // Sign-out successful.
                      })
                      .catch((error) => {
                        alert(error);
                        // An error happened.
                      });
                    location.reload();
                  }}
                >
                  Sign out
                </div>
              ) : (
                <div>
                  <form>
                    <input
                      type="email"
                      placeholder="Email"
                      className="input input-primary input-sm"
                    />
                    <input
                      type="password"
                      placeholder="Password"
                      className="input input-primary input-sm mt-1"
                    />
                    <button
                      type="submit"
                      className="btn btn-primary btn-sm mt-2"
                      onClick={async (e) => {
                        e.preventDefault();
                        const email = (
                          document.querySelector(
                            'input[type="email"]'
                          ) as HTMLInputElement
                        ).value;
                        const password = (
                          document.querySelector(
                            'input[type="password"]'
                          ) as HTMLInputElement
                        ).value;
                        await signInWithEmailAndPassword(auth, email, password)
                          .then(() => {
                            // Signed in
                            location.reload();
                          })
                          .catch((error) => {
                            alert(error);
                          });
                      }}
                    >
                      Sign in
                    </button>
                  </form>
                </div>
              )}
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}

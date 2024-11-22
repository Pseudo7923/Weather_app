#include <bits/stdc++.h>
using namespace std;
int main()
{
    vector<int> v;
    stack<int> s;
    int n, a[n];
    cin >> n >> a[n];
    for (int i = n - 1; i >= 0; i--)
    {
        if (s.size() == 0)
        {
            v.push_back(-1);
        }
        else if (s.size() != 0 && s.top() > a[i])
        {
            v.push_back(s.top());
        }
        else if (s.size() != 0 && s.top() < a[i])
        {
            while (s.size() > 0 && s.top() <= a[i])
            {
                s.pop();
                if (s.size() == 0)
                {
                    v.push_back(-1);
                }
                else
                {
                    v.push_back(s.top());
                }
            }
            v.push_back(a[i]);
        }
    }
}